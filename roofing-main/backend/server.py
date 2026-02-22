from fastapi import FastAPI, APIRouter, HTTPException, Response
from fastapi.middleware.gzip import GZipMiddleware
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from functools import lru_cache

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, maxPoolSize=50, minPoolSize=10)
db = client[os.environ['DB_NAME']]

# Resend setup (optional - only if key is configured)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = "sales22groofing@outlook.com"

if RESEND_API_KEY:
    import resend
    resend.api_key = RESEND_API_KEY

# Create the main app
app = FastAPI(title="22G Roofing API")

# Add GZip compression for faster responses
app.add_middleware(GZipMiddleware, minimum_size=500)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Models
class QuoteRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service_type: str
    address: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service_type: str
    address: Optional[str] = None
    message: Optional[str] = None

class Project(BaseModel):
    id: str
    title: str
    description: str
    image_url: str
    category: str

class ContactInfo(BaseModel):
    company_name: str
    address: str
    suburb: str
    state: str
    postcode: str
    country: str
    contacts: List[dict]
    email: str

# Cache for static data
_contact_info_cache = None
_services_cache = None
_projects_cache = None

def get_contact_info_data():
    return ContactInfo(
        company_name="22G Roofing Pty Ltd",
        address="12 Bedford Road",
        suburb="Blacktown",
        state="NSW",
        postcode="2148",
        country="Australia",
        contacts=[
            {"name": "Pavandeep Singh", "phone": "+61 448 046 461", "role": "Director"},
            {"name": "Bhupendra Singh", "phone": "+61 410 632 540", "role": "Director"}
        ],
        email="sales22groofing@outlook.com"
    )

def get_services_data():
    return [
        {
            "id": "new-roof",
            "title": "New Roof Installations",
            "description": "Complete roofing solutions for new constructions. We work with builders and developers to deliver premium Colorbond and metal roofing systems that meet Australian standards.",
            "features": ["Colorbond Steel", "Custom Designs", "Builder Partnerships", "Warranty Included"],
            "image_url": "https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/bqgdo8o5_image.png"
        },
        {
            "id": "re-roofing",
            "title": "Re-Roofing",
            "description": "Transform your existing roof with modern materials. We remove old roofing and install new, energy-efficient roofing systems that increase property value.",
            "features": ["Old Roof Removal", "Structural Assessment", "Modern Materials", "Energy Efficient"],
            "image_url": "https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/eyl3f5oa_image.png"
        },
        {
            "id": "metal-roofing",
            "title": "Metal Roofing",
            "description": "Specializing in premium metal roofing including Colorbond, Zincalume, and custom profiles. Durable, long-lasting, and aesthetically superior.",
            "features": ["Colorbond Range", "Zincalume", "Custom Profiles", "30+ Year Lifespan"],
            "image_url": "https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/4pmdshnp_image.png"
        },
        {
            "id": "flashings",
            "title": "Gutter & Fascia",
            "description": "Custom fabricated gutters, fascias, and guttering systems. Precision engineering for perfect water management and aesthetic finish.",
            "features": ["Custom Fabrication", "Box Gutters", "Fascia Boards", "Downpipes"],
            "image_url": "https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/v3mzm8hp_image.png"
        },
        {
            "id": "skylights",
            "title": "Skylights Velux",
            "description": "Professional Velux skylight installation to bring natural light into your home. We supply and install leading brands with weatherproof guarantees.",
            "features": ["Velux Skylights", "Custom Sizes", "Weatherproof Seal", "Natural Light"],
            "image_url": "https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/qs0saba9_image.png"
        }
    ]

def get_projects_data():
    return [
        Project(
            id="1",
            title="Residential Metal Roofing",
            description="Premium Colorbond roofing with skylights installation",
            image_url="https://customer-assets.emergentagent.com/job_5a784e05-5e78-4067-aa14-a5ab6084b2ac/artifacts/gp6z1kef_WhatsApp%20Image%202026-01-30%20at%202.39.05%20PM%20%282%29.jpeg",
            category="Residential"
        ),
        Project(
            id="2",
            title="Complex Roof Design",
            description="Multi-angle metal roofing with precision flashings",
            image_url="https://customer-assets.emergentagent.com/job_5a784e05-5e78-4067-aa14-a5ab6084b2ac/artifacts/ov39vvwi_WhatsApp%20Image%202026-01-30%20at%202.39.01%20PM%20%281%29.jpeg",
            category="Residential"
        ),
        Project(
            id="3",
            title="New Construction Roofing",
            description="Complete roofing solution for new residential build",
            image_url="https://customer-assets.emergentagent.com/job_5a784e05-5e78-4067-aa14-a5ab6084b2ac/artifacts/pf0u4br6_WhatsApp%20Image%202026-01-30%20at%202.39.06%20PM%20%282%29.jpeg",
            category="New Build"
        ),
        Project(
            id="4",
            title="Estate Development",
            description="Large scale roofing for housing development",
            image_url="https://customer-assets.emergentagent.com/job_5a784e05-5e78-4067-aa14-a5ab6084b2ac/artifacts/tdv7gci1_WhatsApp%20Image%202026-01-30%20at%202.39.05%20PM%20%281%29.jpeg",
            category="Commercial"
        ),
        Project(
            id="5",
            title="Premium Metal Roofing",
            description="High-quality metal roofing with professional finish",
            image_url="https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/6ua3knbe_WhatsApp%20Image%202026-01-30%20at%202.39.00%20PM%20%282%29.jpeg",
            category="Residential"
        ),
        Project(
            id="6",
            title="Modern Roof Installation",
            description="Contemporary roofing design for new home construction",
            image_url="https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/virlv45z_WhatsApp%20Image%202026-01-30%20at%202.39.05%20PM%20%283%29%20-%20Copy.jpeg",
            category="New Build"
        ),
        Project(
            id="7",
            title="Suburban Residential Roofing",
            description="Quality roofing installation in residential estate",
            image_url="https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/iqdm2y7x_WhatsApp%20Image%202026-01-30%20at%202.39.00%20PM.jpeg",
            category="Residential"
        ),
        Project(
            id="8",
            title="Ridge Cap Installation",
            description="Precision ridge capping and flashing work",
            image_url="https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/9iuslaag_WhatsApp%20Image%202026-01-30%20at%202.39.04%20PM%20%282%29.jpeg",
            category="Residential"
        ),
        Project(
            id="9",
            title="New Development Roofing",
            description="Roofing for new housing development project",
            image_url="https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/wu8yn02h_WhatsApp%20Image%202026-01-30%20at%202.39.04%20PM.jpeg",
            category="New Build"
        ),
    ]

# Routes
@api_router.get("/")
async def root():
    return {"message": "22G Roofing API", "status": "active"}

@api_router.get("/contact-info", response_model=ContactInfo)
async def get_contact_info(response: Response):
    response.headers["Cache-Control"] = "public, max-age=3600"
    return get_contact_info_data()

@api_router.get("/projects", response_model=List[Project])
async def get_projects(response: Response):
    response.headers["Cache-Control"] = "public, max-age=1800"
    return get_projects_data()

@api_router.get("/services")
async def get_services(response: Response):
    response.headers["Cache-Control"] = "public, max-age=3600"
    return get_services_data()

@api_router.post("/quote", response_model=QuoteRequest)
async def submit_quote(input: QuoteRequestCreate):
    quote_obj = QuoteRequest(**input.dict())
    quote_dict = quote_obj.dict()
    quote_dict['created_at'] = quote_obj.created_at.isoformat()
    
    # Store in MongoDB
    await db.quotes.insert_one(quote_dict)
    logger.info(f"Quote request saved: {quote_obj.id}")
    
    # Send email notification if Resend is configured
    if RESEND_API_KEY:
        try:
            email_html = f"""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border: 1px solid #e2e8f0;">
                    <h1 style="color: #0f172a; margin-bottom: 20px;">New Quote Request</h1>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Name:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{quote_obj.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Email:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{quote_obj.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Phone:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{quote_obj.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Service:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{quote_obj.service_type}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Address:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">{quote_obj.address or 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Message:</td>
                            <td style="padding: 10px 0; color: #0f172a;">{quote_obj.message or 'No message'}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 30px; color: #64748b; font-size: 12px;">
                        Submitted on {quote_obj.created_at.strftime('%d %B %Y at %I:%M %p')}
                    </p>
                </div>
            </body>
            </html>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [NOTIFICATION_EMAIL],
                "subject": f"New Quote Request - {quote_obj.service_type}",
                "html": email_html
            }
            
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Email notification sent for quote: {quote_obj.id}")
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
    
    return quote_obj

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quotes():
    quotes = await db.quotes.find({}, {"_id": 0}).to_list(1000)
    return quotes

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

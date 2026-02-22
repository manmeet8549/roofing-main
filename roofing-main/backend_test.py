import requests
import sys
import json
from datetime import datetime

class RoofingAPITester:
    def __init__(self, base_url="https://aussie-roof-pros.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_contact_info(self):
        """Test contact info endpoint"""
        success, response = self.run_test("Contact Info", "GET", "contact-info", 200)
        if success:
            # Verify required fields
            required_fields = ['company_name', 'address', 'contacts', 'email']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing required field: {field}")
                    return False
            
            # Verify contacts structure
            if len(response.get('contacts', [])) != 2:
                print(f"❌ Expected 2 contacts, got {len(response.get('contacts', []))}")
                return False
                
            print("✅ Contact info structure validated")
        return success

    def test_services(self):
        """Test services endpoint"""
        success, response = self.run_test("Services", "GET", "services", 200)
        if success:
            if not isinstance(response, list):
                print("❌ Services response should be a list")
                return False
            
            if len(response) != 5:
                print(f"❌ Expected 5 services, got {len(response)}")
                return False
                
            # Check service structure
            for service in response:
                required_fields = ['id', 'title', 'description', 'features', 'image_url']
                for field in required_fields:
                    if field not in service:
                        print(f"❌ Service missing field: {field}")
                        return False
            
            print("✅ All 5 services validated")
        return success

    def test_projects(self):
        """Test projects endpoint"""
        success, response = self.run_test("Projects", "GET", "projects", 200)
        if success:
            if not isinstance(response, list):
                print("❌ Projects response should be a list")
                return False
            
            if len(response) < 4:
                print(f"❌ Expected at least 4 projects, got {len(response)}")
                return False
                
            # Check project structure
            for project in response:
                required_fields = ['id', 'title', 'description', 'image_url', 'category']
                for field in required_fields:
                    if field not in project:
                        print(f"❌ Project missing field: {field}")
                        return False
            
            print("✅ Projects structure validated")
        return success

    def test_quote_submission(self):
        """Test quote submission"""
        test_quote = {
            "name": "Test Customer",
            "email": "test@example.com",
            "phone": "0400123456",
            "service_type": "New Roof Installation",
            "address": "123 Test Street, Sydney NSW 2000",
            "message": "Test quote request for automated testing"
        }
        
        success, response = self.run_test("Quote Submission", "POST", "quote", 200, test_quote)
        if success:
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'phone', 'service_type', 'created_at']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Quote response missing field: {field}")
                    return False
            
            print("✅ Quote submission validated")
            return response.get('id')  # Return quote ID for further testing
        return False

    def test_get_quotes(self):
        """Test getting all quotes"""
        success, response = self.run_test("Get Quotes", "GET", "quotes", 200)
        if success:
            if not isinstance(response, list):
                print("❌ Quotes response should be a list")
                return False
            print(f"✅ Retrieved {len(response)} quotes")
        return success

def main():
    print("🚀 Starting 22G Roofing API Tests")
    print("=" * 50)
    
    tester = RoofingAPITester()
    
    # Test all endpoints
    print("\n📡 Testing API Endpoints...")
    tester.test_root_endpoint()
    tester.test_contact_info()
    tester.test_services()
    tester.test_projects()
    
    print("\n📝 Testing Quote System...")
    quote_id = tester.test_quote_submission()
    tester.test_get_quotes()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
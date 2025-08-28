// Test script for contact form integration
// Run this in browser console on your contact page

async function testContactFormAPI() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact from Frontend',
    message: 'This is a test message to verify the integration between frontend and backend.',
    phone: '+1234567890',
    company: 'Test Company',
    country: 'US'
  };

  try {
    console.log('🧪 Testing contact form API...');
    
    const response = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Contact form API test successful!');
      console.log('📄 Response:', result);
      return result;
    } else {
      console.error('❌ API test failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

// Run the test
testContactFormAPI();

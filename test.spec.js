const { test, expect } = require('@playwright/test');

test('SimplyBook Signup with Unique Name', async ({ page, context }) => {
  
  // **Generate a unique name using timestamp**
  const uniqueName = `User${Date.now()}`; 
  const uniqueEmail = `test${Date.now()}@gmail.com`;

  // **1. Navigate to SimplyBook homepage**
  await page.goto('https://simplybook.me/en/');
  
  // **2. Click on "Sign in"**
  await page.getByRole('link', { name: 'Sign in' }).click();

  // **3. Fill company login details with unique name**
  await page.getByRole('textbox', { name: 'Company login (part of URL,' }).fill(uniqueName);

  await page.waitForLoadState('domcontentloaded'); // Ensure next page is loaded
  await page.getByRole('textbox', { name: '56789' }).click();
  await page.getByRole('textbox', { name: '56789' }).fill('92929 30292');

  // **4. Select Business Category**
  await page.getByRole('textbox', { name: 'Please choose your business' }).click();
  await page.locator('#categories-output').getByText('Sport').click();
  await page.locator('#select-triangle').click();

  // **5. Click Continue**
  await page.locator('#to-location-step').click();
  await page.waitForLoadState('domcontentloaded'); // Ensure next page is loaded

  // **6. Fill Location Details**
  await page.getByLabel('Country', { exact: true }).selectOption('IN');
  await page.getByRole('textbox', { name: 'City' }).click();
  await page.getByRole('textbox', { name: 'City' }).fill('chennai');
  await page.getByRole('textbox', { name: 'ZIP / Post code' }).click();
  await page.getByRole('textbox', { name: 'ZIP / Post code' }).fill('600125');
  await page.getByRole('textbox', { name: 'Street address' }).click();
  await page.getByRole('textbox', { name: 'Street address' }).fill('local address');
  await page.getByRole('button', { name: 'Continue' }).click();

  // **7. Fill Personal Details with unique name & email**
  await page.getByRole('textbox', { name: 'Your name' }).fill(uniqueName);
  await page.getByRole('textbox', { name: 'Email' }).fill(uniqueEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill('Password');

  console.log(`Generated Unique Name: ${uniqueName}`);
  console.log(`Generated Unique Email: ${uniqueEmail}`);

  // **8. Solve CAPTCHA manually**
  console.log('Please complete CAPTCHA manually before proceeding.');

  // **9. Click "Verify" and Sign Up**
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('link', { name: 'Sign up now' }).click();

  // **10. Accept Terms & Subscribe**
  await page.getByRole('checkbox', { name: 'I agree to the provisions of' }).check();
  await page.getByRole('link', { name: 'Sign up now' }).click();

  // **11. Email Verification (Manually login to Gmail)**
  const gmailPage = await context.newPage();
  await gmailPage.goto('https://mail.google.com/');
  console.log('Please manually verify the confirmation email.');

  // **12. Navigate to SimplyBook Dashboard**
  await page.goto('https://createnew.secure.simplybook.me/v2/r/welcome/#/tour/booking-site-type');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();

  // **13. Setup Provider Details**
  await page.getByRole('textbox', { name: 'Provider name *' }).fill('DemoTest');
  await page.getByRole('button', { name: 'Continue' }).click();

  // **14. Setup Service Details**
  await page.getByRole('textbox', { name: 'Service name *' }).fill('Sports');
  await page.getByRole('button', { name: 'Continue' }).click();

  // **15. Navigate to Booking Page**
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: ' Go to your booking website' }).click();
  const page1 = await page1Promise;

  // **16. Make a Booking**
  await page1.getByRole('link', { name: 'Book Now' }).click();
  await page1.locator('.weeks-date > div > .inner > div:nth-child(4)').first().click();
  await page1.getByRole('link', { name: '17:' }).click();

  // **17. Fill Booking Form**
  await page1.getByRole('textbox', { name: 'Name: *' }).fill('Test');
  await page1.getByRole('textbox', { name: 'Email: *' }).fill('Test1@gmail.com');
  await page1.getByRole('textbox', { name: 'Enter phone number' }).fill('9192939495');
  await page1.getByRole('checkbox', { name: 'I agree with SimplyBook.me' }).check();
  await page1.getByRole('button', { name: 'Confirm booking' }).click();

  // **18. Validate Booking Success**
  await page1.goto('https://createnew.simplybook.me/v2/#client/bookings/ids/1/status/success');
  await expect(page1.getByRole('heading', { name: 'Success' })).toBeVisible();
  console.log('Booking confirmed successfully!');

  // **19. Navigate to Payment Page**
  await page.goto('https://createnew.secure.simplybook.me/v2/r/payment-widget#/');
  await page.getByRole('checkbox', { name: 'I accept terms and conditions' }).check();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('textbox', { name: 'ZIP Code' }).fill('600125');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // **20. Handle Payment Cancellation**
  await page.goto('https://checkout.stripe.com/c/pay/cs_live_c1gGMKknUHj0qzT7CJOOQ9ObQOKP9503l6ScDP5YS4y5QyUj3I12dCET6c#');
  await page.getByRole('link', { name: 'Back to SimplyBook.me ltd' }).click();
  await page.goto('https://createnew.secure.simplybook.me/v2/r/payment-widget#/result/payment/1950705');
  await page.getByText('Payment cancelled').click();

  // **21. Logout**
  await page.getByRole('link', { name: 'Log out' }).click();
  console.log('Logged out successfully.');

});

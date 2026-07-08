/**
 * اسکریپت ساده برای استخراج endpointها از فایل‌های controller
 *
 * نحوه استفاده:
 * node extract-endpoints.js
 */

const fs = require('fs');
const path = require('path');

// پوشه controllers
const controllersDir = path.join(__dirname, 'src', 'controllers');

// خواندن همه فایل‌های controller
const controllerFiles = fs
  .readdirSync(controllersDir)
  .filter((file) => file.endsWith('.controller.ts'));

console.log('🔍 در حال بررسی endpointها...\n');
console.log('='.repeat(60));

controllerFiles.forEach((file) => {
  const filePath = path.join(controllersDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  console.log(`\n📁 فایل: ${file}`);
  console.log('-'.repeat(60));

  // پیدا کردن @Controller('...')
  const controllerMatch = content.match(/@Controller\(['"]([^'"]+)['"]\)/);
  const controllerPrefix = controllerMatch ? controllerMatch[1] : '';

  // پیدا کردن همه method decorators
  const methods = [
    { decorator: '@Get', method: 'GET' },
    { decorator: '@Post', method: 'POST' },
    { decorator: '@Put', method: 'PUT' },
    { decorator: '@Delete', method: 'DELETE' },
    { decorator: '@Patch', method: 'PATCH' },
  ];

  methods.forEach(({ decorator, method }) => {
    // پیدا کردن همه استفاده‌ها از این decorator
    const regex = new RegExp(`${decorator}\\(['"]?([^'")]*)['"]?\\)`, 'g');
    let match;

    while ((match = regex.exec(content)) !== null) {
      const route = match[1] || '';
      const fullRoute = `/${controllerPrefix}${route ? '/' + route : ''}`;

      // بررسی نیاز به احراز هویت
      const needsAuth =
        content.includes('@UseGuards(AuthGuard)') ||
        content.includes('@ApiBearerAuth()');

      // پیدا کردن پارامترها
      const hasQuery = content.includes('@Query');
      const hasParam = content.includes('@Param');
      const hasBody = content.includes('@Body');

      console.log(`  ${method.padEnd(6)} ${fullRoute}`);

      if (needsAuth) {
        console.log(`         🔒 نیاز به Bearer Token`);
      }

      if (hasQuery) {
        console.log(`         📋 Query Parameters دارد`);
      }

      if (hasParam) {
        console.log(`         🔗 Path Parameters دارد`);
      }

      if (hasBody) {
        console.log(`         📦 Body Parameters دارد`);
      }
    }
  });
});

console.log('\n' + '='.repeat(60));
console.log('\n💡 نکته: برای دیدن جزئیات کامل، از Swagger استفاده کنید:');
console.log('   http://localhost:3000/api\n');

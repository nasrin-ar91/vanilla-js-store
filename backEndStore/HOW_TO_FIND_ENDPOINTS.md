# راهنمای پیدا کردن Endpoint ها در پروژه NestJS

این راهنما به شما یاد می‌دهد که چطور می‌توانید endpointهای یک پروژه NestJS را پیدا کنید.

## روش 1: استفاده از Swagger (ساده‌ترین روش) 🎯

### گام 1: سرور را اجرا کنید

```bash
npm run start:dev
```

### گام 2: به Swagger UI بروید

بعد از اجرای سرور، به آدرس زیر بروید:

```
http://localhost:3000/api
```

در این صفحه **همه endpointها** به صورت خودکار نمایش داده می‌شوند و می‌توانید:

- همه routeها را ببینید
- پارامترهای هر endpoint را ببینید
- مستقیماً تست کنید
- مستندات کامل را ببینید

---

## روش 2: بررسی فایل‌های Controller (روش کدنویسی) 💻

### گام 1: پیدا کردن پوشه Controllers

```
src/controllers/
```

### گام 2: خواندن Decorator های NestJS

در NestJS، endpointها با **Decorator** ها تعریف می‌شوند:

#### الف) Decorator اصلی: `@Controller()`

این decorator **پیشوند (prefix)** همه routeهای یک کنترلر را مشخص می‌کند.

**مثال:**

```typescript
@Controller('auth') // یعنی همه routeها با /auth شروع می‌شوند
export class AuthController {
  // ...
}
```

#### ب) Decorator های HTTP Method:

- `@Get()` → درخواست GET
- `@Post()` → درخواست POST
- `@Put()` → درخواست PUT
- `@Delete()` → درخواست DELETE
- `@Patch()` → درخواست PATCH

**مثال:**

```typescript
@Get()  // یعنی GET /auth
getAll() { }

@Post('signup')  // یعنی POST /auth/signup
signup() { }
```

### گام 3: ترکیب کردن Route

**فرمول:**

```
Route کامل = @Controller() + @Get/@Post/etc() + مسیر اضافی
```

**مثال‌های واقعی از پروژه شما:**

#### مثال 1: Auth Controller

```typescript
@Controller('auth') // پیشوند: /auth
export class AuthController {
  @Post('signup') // مسیر اضافی: /signup
  signup() {}
  // Route کامل: POST /auth/signup

  @Post('login') // مسیر اضافی: /login
  login() {}
  // Route کامل: POST /auth/login
}
```

#### مثال 2: User Controller

```typescript
@Controller('user') // پیشوند: /user
export class UserController {
  @Get() // مسیر اضافی: (خالی)
  getInfo() {}
  // Route کامل: GET /user

  @Delete() // مسیر اضافی: (خالی)
  deleteAccount() {}
  // Route کامل: DELETE /user
}
```

#### مثال 3: Sneaker Controller

```typescript
@Controller('sneaker') // پیشوند: /sneaker
export class TaskController {
  @Get() // مسیر اضافی: (خالی)
  getAllSneakers() {}
  // Route کامل: GET /sneaker

  @Get('item/:id') // مسیر اضافی: /item/:id
  getSneakerById() {}
  // Route کامل: GET /sneaker/item/:id

  @Get('brands') // مسیر اضافی: /brands
  getBrands() {}
  // Route کامل: GET /sneaker/brands
}
```

### گام 4: شناسایی پارامترها

#### Query Parameters (برای GET)

```typescript
@Get()
getAllSneakers(
  @Query('page') page?: number,      // ?page=1
  @Query('limit') limit?: number,     // ?limit=10
  @Query('search') search?: string    // ?search=nike
) { }
```

#### Path Parameters (در URL)

```typescript
@Get('item/:id')
getSneakerById(@Param('id') id: number) { }
// مثال: GET /sneaker/item/5
```

#### Body Parameters (برای POST/PUT)

```typescript
@Post('signup')
signup(@Body() body: CreateUserDto) { }
// Body در JSON ارسال می‌شود
```

### گام 5: شناسایی احراز هویت

اگر endpoint نیاز به احراز هویت دارد، این decorator را می‌بینید:

```typescript
@UseGuards(AuthGuard)    // نیاز به Token دارد
@ApiBearerAuth()         // در Swagger نشان می‌دهد که Bearer Token لازم است
```

**مثال:**

```typescript
@Controller('user')
@UseGuards(AuthGuard) // همه endpointهای این کنترلر نیاز به Token دارند
export class UserController {
  // ...
}
```

---

## روش 3: بررسی app.module.ts 📦

در فایل `app.module.ts` می‌توانید ببینید چه کنترلرهایی ثبت شده‌اند:

```typescript
@Module({
  controllers: [
    TaskController,      // کنترلر sneaker
    AuthController,      // کنترلر auth
    UserController,      // کنترلر user
  ],
})
```

---

## چک‌لیست پیدا کردن Endpoint ها ✅

برای هر پروژه NestJS جدید:

1. ✅ پوشه `src/controllers/` را باز کنید
2. ✅ فایل‌های `.controller.ts` را پیدا کنید
3. ✅ `@Controller()` را بخوانید (پیشوند route)
4. ✅ `@Get()`, `@Post()`, `@Delete()` و غیره را پیدا کنید
5. ✅ مسیرهای اضافی را بخوانید
6. ✅ پارامترها را شناسایی کنید (`@Query`, `@Param`, `@Body`)
7. ✅ `@UseGuards()` را بررسی کنید (نیاز به احراز هویت)
8. ✅ Swagger را بررسی کنید (`http://localhost:3000/api`)

---

## مثال کامل: تحلیل یک Controller

بیایید `auth.controller.ts` را تحلیل کنیم:

```typescript
@Controller('auth') // ← پیشوند: /auth
export class AuthController {
  @Post('signup') // ← POST + /signup
  async signup(@Body() body: CreateUserDto) {
    // Route: POST /auth/signup
    // Body: { username: string, password: string }
    // احراز هویت: ❌ نیاز ندارد
  }

  @Post('login') // ← POST + /login
  async login(@Body() body: LoginDto) {
    // Route: POST /auth/login
    // Body: { username: string, password: string }
    // احراز هویت: ❌ نیاز ندارد
  }
}
```

**نتیجه:**

- ✅ `POST /auth/signup` - ثبت‌نام
- ✅ `POST /auth/login` - ورود
- ❌ هیچ endpoint نیاز به Token ندارد

---

## نکات مهم 💡

1. **اگر `@Get()` یا `@Post()` خالی باشد**، یعنی route همان پیشوند `@Controller()` است

   - مثال: `@Controller('user')` + `@Get()` = `GET /user`

2. **اگر `@Get('something')` باشد**، مسیر اضافه می‌شود

   - مثال: `@Controller('sneaker')` + `@Get('brands')` = `GET /sneaker/brands`

3. **`:id` در route** یعنی یک پارامتر پویا

   - مثال: `@Get('item/:id')` = `GET /sneaker/item/123` (123 مقدار id است)

4. **`@UseGuards(AuthGuard)`** یعنی endpoint نیاز به Bearer Token دارد

   - باید در header ارسال کنید: `Authorization: Bearer <token>`

5. **Swagger همیشه بهترین راه است** برای دیدن همه endpointها به صورت بصری

---

## تمرین 🎓

حالا خودتان این endpointها را پیدا کنید:

1. `GET /sneaker` - چه پارامترهایی دارد؟
2. `GET /sneaker/item/:id` - چه نوع پارامتری می‌گیرد؟
3. `DELETE /user` - نیاز به احراز هویت دارد؟

**جواب:**

1. ✅ `page`, `limit`, `search`, `brands` (همه اختیاری)
2. ✅ `id` (عدد - از path می‌آید)
3. ✅ بله، نیاز به Bearer Token دارد

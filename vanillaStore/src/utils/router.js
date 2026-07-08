// Router ساده برای مدیریت مسیرها
import { store } from "./store";

function createRouter() {
	let routes = {};
	let currentRoute = "";
	let currentParams = {};

	// ثبت یک route جدید
	function addRoute(path, component) {
		routes[path] = component;
	}

	// تبدیل مسیر به pattern (مثلا /product/:id)
	function pathToRegex(path) {
		const keys = [];
		const pattern = path
			.replace(/\//g, "\\/")
			.replace(/:(\w+)/g, (match, key) => {
				keys.push(key);
				return "([^\\/]+)";
			});
		return {
			pattern: new RegExp(`^${pattern}$`),
			keys,
		};
	}

	function matchRoute(path) {
		for (const routePath in routes) {
			const { pattern, keys } = pathToRegex(routePath);
			const match = path.match(pattern);

			if (match) {
				const params = {};
				keys.forEach((key, index) => {
					params[key] = match[index + 1];
				});
				return {
					component: routes[routePath],
					params,
				};
			}
		}
		return null;
	}

	// دریافت مسیر از URL (از pathname استفاده می‌کنیم به جای hash)
	function getHash() {
		const pathname = window.location.pathname;
		// اگر pathname فقط "/" است، "/" برمی‌گردانیم
		return pathname === "/" ? "/" : pathname;
	}

	// ناوبری به یک مسیر (استفاده از History API)
	function navigate(path) {
		// اطمینان از اینکه path با / شروع می‌شود
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;
		// استفاده از History API به جای hash
		window.history.pushState({}, "", normalizedPath);
		// فایر کردن رویداد popstate برای رندر
		window.dispatchEvent(new PopStateEvent("popstate"));
	}

	// رندر کردن کامپوننت فعلی
	function render(container) {
		const hash = getHash();
		const matched = matchRoute(hash);

		if (matched) {
			currentRoute = hash;
			currentParams = matched.params;

			// ذخیره route و params در store برای استفاده در کامپوننت‌ها
			store.setState("currentRoute", hash);
			store.setState("routeParams", matched.params);

			// پاک کردن container
			container.innerHTML = "";

			// رندر کردن کامپوننت
			const componentElement = matched.component(matched.params);
			if (componentElement) {
				container.appendChild(componentElement);
			}
		} else {
			// اگر route پیدا نشد، به صفحه 404 یا home برو
			if (hash !== "/") {
				navigate("/");
			} else {
				container.innerHTML =
					"<div class='p-6 text-center text-red-500'>404 - Page Not Found</div>";
			}
		}
	}

	// راه‌اندازی router
	function init(container) {
		// تابع برای رندر کردن با چک کردن تغییرات
		const handleRouteChange = () => {
			render(container);
		};

		// گوش دادن به تغییرات history (برای دکمه‌های back/forward و تغییرات دستی URL)
		window.addEventListener("popstate", handleRouteChange);

		// برای تشخیص تغییرات دستی URL در address bar
		// یک polling mechanism اضافه می‌کنیم که هر 200ms pathname را چک می‌کند
		const checkPathInterval = setInterval(() => {
			const currentPath = getHash();
			// اگر path تغییر کرده و با route فعلی متفاوت است، رندر می‌کنیم
			if (currentPath !== currentRoute) {
				handleRouteChange();
			}
		}, 200);

		// تمیز کردن interval وقتی صفحه بسته می‌شود
		window.addEventListener("beforeunload", () => {
			clearInterval(checkPathInterval);
		});

		// همچنین وقتی کاربر focus را از صفحه برمی‌گرداند، چک می‌کنیم
		window.addEventListener("focus", () => {
			const currentPath = getHash();
			if (currentPath !== currentRoute) {
				handleRouteChange();
			}
		});

		// رندر اولیه
		render(container);
	}

	// دریافت route فعلی
	function getCurrentRoute() {
		return currentRoute;
	}

	// دریافت params فعلی
	function getCurrentParams() {
		return currentParams;
	}

	return {
		addRoute,
		navigate,
		init,
		getCurrentRoute,
		getCurrentParams,
	};
}

// ایجاد یک instance مشترک از router
export const router = createRouter();

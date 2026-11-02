/* =========================================================
   MENARA STORE — MULTI-PRODUCT E-COMMERCE COD SCRIPT
   High-converting, zero-lag Moroccan COD interactions
   ========================================================= */

(function () {
  "use strict";

  const CONFIG = {
    WHATSAPP: "212710054951",
    GOOGLE_SHEET_WEBHOOK: "https://script.google.com/macros/s/AKfycbwVTa6dj32XVpKt17VV9GtITF8sUxNIGi9G9LRpP2WRgFpGm_jVqb_2zOmNb2FOn1NfiQ/exec",
    STORAGE_KEY_ORDERS: "menara_orders_cache",
  };

  /* ---------------- Products Catalog Data ---------------- */
  const PRODUCTS = {
    coat: {
      id: "coat",
      category: "men",
      name: "معطف رجالي شتوي فاخر (مونطو كلاسيكي كاشمير)",
      shortName: "معطف رجالي فاخر",
      kicker: "🧥 أزياء رجالية فاخرة",
      basePrice: 349,
      baseOldPrice: 499,
      doublePrice: 649, // توفير إضافي لمعطفين
      doubleOldPrice: 998,
      reviews: "4.9 (890+ تقييم إيجابي)",
      sizeLabel: "اختر المقاس المناسب:",
      defaultSize: "L",
      sizes: ["M", "L", "XL", "XXL", "3XL"],
      colors: [
        { id: "black", name: "أسود ملكي", hex: "#0f172a", img: "images/coat-black.jpg", badge: "الأكثر طلباً" },
        { id: "gray", name: "رمادي أنيق", hex: "#94a3b8", img: "images/coat-gray.jpg", badge: "أناقة عصرية" },
        { id: "blue", name: "أزرق بترولي", hex: "#1e3a8a", img: "images/coat-blue.jpg", badge: "لون مميز" },
      ],
      specs: [
        { icon: "🧶", label: "نوع القماش", text: "صوف كاشمير أصلي فاخر 100% ملمس ناعم ومقاوم للبرد القارس والرياح الشتوية" },
        { icon: "🛡️", label: "البطانة الداخلية", text: "مبطن بالكامل ببطانة حرارية عازلة تمنح الدفء الفائق والراحة التامة طوال اليوم" },
        { icon: "✂️", label: "القصة والتفصيل", text: "قصة إيطالية ملكية كلاسيكية مع ياقة عصرية وجيوب جانبية مريحة وتشطيب متقن" },
        { icon: "📏", label: "المقاسات المتوفرة", text: "M - L - XL - XXL - 3XL (مقاسات مضبوطة ومناسبة لجميع الأجسام)" },
        { icon: "🚚", label: "الضمان والاستلام", text: "توصيل سريع مجاني لجميع مدن المغرب مع حق فتح الطرد ومعاينة القياس والجودة قبل الدفع" },
      ],
      packs: [
        {
          id: "pack1",
          name: "معطف واحد (1 قطعة)",
          badge: "الخيار المفضل 👍",
          isDouble: false,
          desc: "معطف كاشمير فاخر واحد باللون والمقاس المختار مع توصيل مجاني",
          piecesCount: 1,
        },
        {
          id: "pack2",
          name: "عرض معطفين (2 قطع - خصم خاص)",
          badge: "وفر 50 د.م إضافية 🔥",
          isDouble: true,
          desc: "احصل على معطفين بألوان أو مقاسات من اختيارك بسعر مخفض 649 درهم",
          piecesCount: 2,
        },
      ],
    },
    polo: {
      id: "polo",
      category: "polo",
      name: "طقم بولو شتوي فاخر للأطفال (Polo Kids)",
      shortName: "طقم بولو للأطفال",
      kicker: "👕 ملابس أطفال راقية",
      basePrice: 199,
      baseOldPrice: 299,
      doublePrice: 369, // طقمين بـ 369
      doubleOldPrice: 598,
      reviews: "5.0 (1,450+ تقييم إيجابي)",
      sizeLabel: "اختر عمر الطفل (المقاس):",
      defaultSize: "6 سنوات",
      sizes: [
        "2 سنوات", "3 سنوات", "4 سنوات", "5 سنوات", "6 سنوات",
        "7 سنوات", "8 سنوات", "9 سنوات", "10 سنوات", "11 سنة", "12 سنة"
      ],
      colors: [
        { id: "green-marble", name: "أخضر رخامي", hex: "#10b981", img: "images/polo-green-marble.jpg", badge: "جديد 2026" },
        { id: "beige-marble", name: "بيج رخامي", hex: "#d4b996", img: "images/polo-beige-marble.jpg", badge: "راقي وجذاب" },
        { id: "gray-marble", name: "رمادي رخامي", hex: "#64748b", img: "images/polo-gray-marble.jpg", badge: "عملي ومميز" },
        { id: "turquoise-marble", name: "تركواز رخامي", hex: "#06b6d4", img: "images/polo-turquoise-marble.jpg", badge: "لون زاهي" },
        { id: "silver-marble", name: "فضي رخامي", hex: "#cbd5e1", img: "images/polo-silver-marble.jpg", badge: "عصري وأنيق" },
        { id: "mocha-marble", name: "موكا رخامي", hex: "#78350f", img: "images/polo-mocha-marble.jpg", badge: "دافئ وفخم" },
      ],
      specs: [
        { icon: "👕", label: "محتويات الطقم", text: "طقم كامل مكون من قطعتين: سويت شيرت كابيشون بسحاب أمامي + بنطلون رياضي مبطن" },
        { icon: "🌿", label: "خامة القماش", text: "قطن شتوي 100% مبطن بطبقة داخلية فائقة النعومة تحمي الطفل من البرد وآمنة على البشرة" },
        { icon: "🎨", label: "النقشة والتطريز", text: "طبعة رخامية عصرية حصرية فائقة الجودة لا تبهت مع الغسيل وتطريز شعار Polo الأصلي" },
        { icon: "📏", label: "الأعمار والمقاسات", text: "متوفر لجميع الفئات العمرية من سنتين (2) حتى 12 سنة كاملة بقصات مريحة" },
        { icon: "🚚", label: "الضمان والاستلام", text: "توصيل مجاني لباب منزلك مع حق المعاينة وقياس الطقم قبل الدفع مع ضمان الاستبدال" },
      ],
      packs: [
        {
          id: "pack1",
          name: "طقم واحد (جاكيت كابيشون + بنطلون)",
          badge: "الخيار القياسي 👍",
          isDouble: false,
          desc: "طقم رياضي شتوي كامل مبطن بقطن دافئ فائق النعومة",
          piecesCount: 2,
        },
        {
          id: "pack2",
          name: "عرض طقمين بولو (4 قطع كاملة)",
          badge: "وفر 30 د.م إضافية 💥",
          isDouble: true,
          desc: "احصل على طقمين للأطفال بألوان رخامية مختلفة بـ 369 درهم فقط",
          piecesCount: 4,
        },
      ],
    },
    spiderman: {
      id: "spiderman",
      category: "pajama",
      name: "طقم بيجامة سبايدرمان للأطفال (باقة 3 أطقم)",
      shortName: "بيجامة سبايدرمان للأطفال",
      kicker: "🕷️ بيجامات أطفال شتوية",
      basePrice: 199,
      baseOldPrice: 329,
      doublePrice: 379, // باقتين (6 أطقم)
      doubleOldPrice: 658,
      reviews: "5.0 (2,500+ تقييم إيجابي)",
      sizeLabel: "اختر عمر الطفل (المقاس):",
      defaultSize: "5 سنوات",
      sizes: [
        "سنة واحدة", "سنتين", "3 سنوات", "4 سنوات", "5 سنوات",
        "6 سنوات", "7 سنوات", "8 سنوات", "9 سنوات", "10 سنوات"
      ],
      colors: [
        { id: "pack1", name: "المجموعة 1 (أسود + أزرق + رمادي)", hex: "#1e293b", img: "images/trio-pack-1.jpeg", badge: "المجموعة 1" },
        { id: "pack2", name: "المجموعة 2 (أخضر + عنابي + بيج)", hex: "#059669", img: "images/trio-pack-2.jpeg", badge: "المجموعة 2" },
      ],
      specs: [
        { icon: "🕷️", label: "محتوى العرض", text: "باقة تشمل 3 أطقم بيجامة كاملة (3 قمصان بأكمام طويلة + 3 سراويل قطنية كاملة)" },
        { icon: "🌿", label: "خامة القماش", text: "قطن ناعم ومريح 100% مناسب للنوم وللحركة اليومية بدون أي تحسس لبشرة الطفل" },
        { icon: "🎨", label: "المجموعات والألوان", text: "المجموعة 1 (أسود + أزرق + رمادي) أو المجموعة 2 (أخضر + عنابي + بيج)" },
        { icon: "📏", label: "الأعمار والمقاسات", text: "تشكيلة للأعمار من سنة واحدة إلى 10 سنوات كاملة بخياطة متينة ومريحة" },
        { icon: "🚚", label: "الضمان والاستلام", text: "3 أطقم بـ 199 درهم فقط مع التوصيل المجاني والدفع بعد الاستلام والمعاينة" },
      ],
      packs: [
        {
          id: "pack1",
          name: "باقة 3 أطقم كاملة (199 درهم)",
          badge: "3 أطقم بـ 199 د.م 🔥",
          isDouble: false,
          desc: "باقة كاملة تشمل 3 أطقم قطنية بيجامة سبايدرمان بألوان منوعة",
          piecesCount: 3,
        },
        {
          id: "pack2",
          name: "العرض المزدوج (6 أطقم كاملة بـ 379 درهم)",
          badge: "وفر 279 د.م الأكبر 💥",
          isDouble: true,
          desc: "المجموعتين معاً: 6 أطقم كاملة لكل فصول الشتاء بسعر 379 درهم فقط",
          piecesCount: 6,
        },
      ],
    },
  };

  /* ---------------- State ---------------- */
  const state = {
    currentProductId: "coat",
    selectedColorId: "black",
    selectedColorName: "أسود ملكي",
    selectedSize: "L",
    selectedPackId: "pack1",
    selectedPackName: "معطف واحد (1 قطعة)",
    isDouble: false,
    quantity: 1,
    submitting: false,
    checkoutTracked: false,
  };

  /* ---------------- DOM Helpers ---------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const mainFeaturedImage = $("#main-featured-image");
  const thumbnailsContainer = $("#thumbnails-container");
  const colorOptionsWrap = $("#color-options-wrap");
  const selectedColorLabel = $("#selected-color-label");
  const sizeGroupTitle = $("#size-group-title");
  const sizePillsWrap = $("#size-pills-wrap");
  const selectedSizeLabel = $("#selected-size-label");
  const packCardsWrap = $("#pack-cards-wrap");
  const selectedPackLabel = $("#selected-pack-label");
  const specsListContainer = $("#specs-list-container");
  const btnQtyMinus = $("#btn-qty-minus");
  const btnQtyPlus = $("#btn-qty-plus");
  const qtyInput = $("#qty-input");
  const priceDisplay = $("#price-display");
  const oldPriceDisplay = $("#old-price-display");
  const discountDisplay = $("#discount-display");
  const msbPriceVal = $("#msb-price-val");
  const topTimer = $("#top-timer");
  const orderForm = $("#order-form");
  const customerName = $("#customer-name");
  const customerPhone = $("#customer-phone");
  const customerCity = $("#customer-city");
  const customerAddress = $("#customer-address");
  const customerNote = $("#customer-note");
  const btnSubmitOrder = $("#btn-submit-order");
  const submitText = $("#submit-text");
  const btnDirectWhatsapp = $("#btn-direct-whatsapp");
  const orderSuccessModal = $("#order-success-modal");
  const modalOrderId = $("#modal-order-id");
  const modalWhatsappBtn = $("#modal-whatsapp-btn");
  const btnCloseModal = $("#btn-close-modal");

  /* ---------------- Price Calculations ---------------- */
  function calculateTotal() {
    const prod = PRODUCTS[state.currentProductId] || PRODUCTS.coat;
    const unitPrice = state.isDouble ? prod.doublePrice : prod.basePrice;
    const unitOldPrice = state.isDouble ? prod.doubleOldPrice : prod.baseOldPrice;
    const total = unitPrice * state.quantity;
    const oldTotal = unitOldPrice * state.quantity;
    const savings = oldTotal - total;
    const percent = Math.round((savings / oldTotal) * 100);
    return { unitPrice, total, oldTotal, savings, percent, prod };
  }

  function updatePriceUI() {
    const { total, oldTotal, savings, percent } = calculateTotal();
    if (priceDisplay) priceDisplay.textContent = total;
    if (oldPriceDisplay) oldPriceDisplay.textContent = `${oldTotal} درهم`;
    if (discountDisplay) discountDisplay.textContent = `وفر ${savings} درهم (${percent}%)`;
    if (msbPriceVal) msbPriceVal.textContent = total;

    updateWhatsAppDirectLink();
  }

  /* ---------------- WhatsApp Direct Link ---------------- */
  function updateWhatsAppDirectLink() {
    if (!btnDirectWhatsapp) return;
    const { total, prod } = calculateTotal();
    const customer = (customerName && customerName.value.trim()) || "زبون متجر منارة";
    const msg = `سلام عليكم متجر منارة، بغيت نطلب ${prod.name} (اللون: ${state.selectedColorName} - المقاس: ${state.selectedSize} - الباقة: ${state.selectedPackName} - الكمية: ${state.quantity}) بمبلغ إجمالي ${total} درهم مع التوصيل المجاني. الاسم: ${customer}.`;
    btnDirectWhatsapp.href = `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  /* ---------------- Render Dynamic Product UI ---------------- */
  function renderProductUI() {
    const prod = PRODUCTS[state.currentProductId] || PRODUCTS.coat;

    // 1. Update text headers (اسم المنتوج في الأعلى)
    const kickerEl = $("#active-product-kicker");
    const titleEl = $("#active-product-title");
    const reviewsEl = $("#active-product-reviews");
    if (kickerEl) kickerEl.textContent = prod.kicker;
    if (titleEl) titleEl.textContent = prod.name;
    if (reviewsEl) reviewsEl.textContent = prod.reviews;
    if (sizeGroupTitle) sizeGroupTitle.textContent = prod.sizeLabel;

    // 2. Update Main Image and Thumbnails (صورة المنتوج أسفل الاسم)
    const curColor = prod.colors.find((c) => c.id === state.selectedColorId) || prod.colors[0];
    if (mainFeaturedImage && curColor) {
      mainFeaturedImage.src = curColor.img;
      mainFeaturedImage.alt = `${prod.name} - ${curColor.name}`;
    }

    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = prod.colors.map((c) => {
        const isActive = c.id === state.selectedColorId;
        return `
          <button type="button" class="thumb-btn ${isActive ? "active" : ""}" data-img="${c.img}" data-color-id="${c.id}" aria-label="عرض لون ${c.name}">
            <img src="${c.img}" alt="${c.name}" loading="lazy" />
          </button>
        `;
      }).join("");
    }

    // 3. Render Specifications (مواصفات ومميزات المنتوج أسفل الصورة)
    if (specsListContainer && Array.isArray(prod.specs)) {
      specsListContainer.innerHTML = prod.specs.map((s) => `
        <div class="spec-item">
          <span class="spec-icon">${s.icon}</span>
          <div class="spec-details">
            <span class="spec-label">${s.label}:</span>
            <span class="spec-text">${s.text}</span>
          </div>
        </div>
      `).join("");
    }

    // 4. Render Color Swatches
    if (colorOptionsWrap) {
      colorOptionsWrap.innerHTML = prod.colors.map((c) => {
        const isActive = c.id === state.selectedColorId;
        return `
          <button type="button" class="color-swatch-btn ${isActive ? "active" : ""}" data-color-id="${c.id}" data-color-name="${c.name}" data-img="${c.img}">
            <span class="swatch-circle" style="background-color: ${c.hex};"></span>
            <span class="swatch-name">${c.name}</span>
          </button>
        `;
      }).join("");
    }

    // 5. Render Size Pills
    if (sizePillsWrap) {
      sizePillsWrap.innerHTML = prod.sizes.map((s) => {
        const isActive = s === state.selectedSize;
        return `
          <button type="button" class="size-pill ${isActive ? "active" : ""}" data-size="${s}">
            <span>${s}</span>
          </button>
        `;
      }).join("");
    }

    // 6. Render Pack Cards
    if (packCardsWrap) {
      packCardsWrap.innerHTML = prod.packs.map((pk) => {
        const isActive = pk.id === state.selectedPackId;
        const packPrice = pk.isDouble ? prod.doublePrice : prod.basePrice;
        const packOldPrice = pk.isDouble ? prod.doubleOldPrice : prod.baseOldPrice;
        return `
          <div class="pack-card ${isActive ? "active" : ""}" data-pack-id="${pk.id}" data-is-double="${pk.isDouble}">
            <div class="pack-badge">${pk.badge}</div>
            <div class="pack-content">
              <span class="pack-radio-circle"></span>
              <div class="pack-text">
                <div class="pack-title">${pk.name}</div>
                <div class="pack-sub">${pk.desc}</div>
              </div>
            </div>
            <div class="pack-pricing">
              <span class="pack-price">${packPrice} د.م</span>
              <span class="pack-old">${packOldPrice} د.م</span>
            </div>
          </div>
        `;
      }).join("");
    }

    // 7. Update Labels
    if (selectedColorLabel) selectedColorLabel.textContent = state.selectedColorName;
    if (selectedSizeLabel) selectedSizeLabel.textContent = state.selectedSize;
    if (selectedPackLabel) selectedPackLabel.textContent = state.selectedPackName;

    // 8. Update Active State in Catalog Cards
    $$(".store-product-card").forEach((card) => {
      const pid = card.getAttribute("data-product-id");
      if (pid === state.currentProductId) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    updatePriceUI();
  }

  /* ---------------- Switch Product ---------------- */
  function switchProduct(productId, colorId, size) {
    if (!PRODUCTS[productId]) return;
    state.currentProductId = productId;
    const prod = PRODUCTS[productId];

    // Pick color
    if (colorId && prod.colors.some((c) => c.id === colorId)) {
      state.selectedColorId = colorId;
      state.selectedColorName = prod.colors.find((c) => c.id === colorId).name;
    } else {
      state.selectedColorId = prod.colors[0].id;
      state.selectedColorName = prod.colors[0].name;
    }

    // Pick size
    if (size && prod.sizes.includes(size)) {
      state.selectedSize = size;
    } else {
      state.selectedSize = prod.defaultSize || prod.sizes[0];
    }

    // Reset pack to pack1 (single)
    state.selectedPackId = "pack1";
    state.selectedPackName = prod.packs[0].name;
    state.isDouble = false;

    renderProductUI();
  }

  /* ---------------- Select Color ---------------- */
  function selectColor(colorId) {
    const prod = PRODUCTS[state.currentProductId];
    if (!prod) return;
    const found = prod.colors.find((c) => c.id === colorId);
    if (!found) return;

    state.selectedColorId = found.id;
    state.selectedColorName = found.name;
    if (selectedColorLabel) selectedColorLabel.textContent = found.name;

    // Update main image with smooth transition
    if (mainFeaturedImage) {
      mainFeaturedImage.style.opacity = "0.4";
      setTimeout(() => {
        mainFeaturedImage.src = found.img;
        mainFeaturedImage.alt = `${prod.name} - ${found.name}`;
        mainFeaturedImage.style.opacity = "1";
      }, 100);
    }

    // Update active thumbnail
    $$("#thumbnails-container .thumb-btn").forEach((btn) => {
      if (btn.getAttribute("data-color-id") === colorId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update active swatch
    $$("#color-options-wrap .color-swatch-btn").forEach((btn) => {
      if (btn.getAttribute("data-color-id") === colorId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    updateWhatsAppDirectLink();
  }

  /* ---------------- Color Swatch & Thumbnail Events ---------------- */
  function initColorAndGalleryControls() {
    if (colorOptionsWrap) {
      colorOptionsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".color-swatch-btn");
        if (!btn) return;
        const colorId = btn.getAttribute("data-color-id");
        if (colorId) selectColor(colorId);
      });
    }

    if (thumbnailsContainer) {
      thumbnailsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".thumb-btn");
        if (!btn) return;
        const colorId = btn.getAttribute("data-color-id");
        if (colorId) selectColor(colorId);
      });
    }
  }

  /* ---------------- Size Selector ---------------- */
  function initSizeSelector() {
    if (!sizePillsWrap) return;

    sizePillsWrap.addEventListener("click", (e) => {
      const pill = e.target.closest(".size-pill");
      if (!pill) return;

      $$("#size-pills-wrap .size-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      state.selectedSize = pill.getAttribute("data-size") || pill.textContent.trim();
      if (selectedSizeLabel) selectedSizeLabel.textContent = state.selectedSize;

      updateWhatsAppDirectLink();
    });
  }

  /* ---------------- Pack Cards ---------------- */
  function initPackCards() {
    if (!packCardsWrap) return;

    packCardsWrap.addEventListener("click", (e) => {
      const card = e.target.closest(".pack-card");
      if (!card) return;

      $$("#pack-cards-wrap .pack-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const packId = card.getAttribute("data-pack-id");
      const isDouble = card.getAttribute("data-is-double") === "true";
      const prod = PRODUCTS[state.currentProductId];
      const packObj = prod.packs.find((pk) => pk.id === packId) || prod.packs[0];

      state.selectedPackId = packId;
      state.selectedPackName = packObj.name;
      state.isDouble = isDouble;

      if (selectedPackLabel) selectedPackLabel.textContent = packObj.name;

      updatePriceUI();
    });
  }

  /* ---------------- Quantity Controls ---------------- */
  function initQuantityControls() {
    if (!btnQtyMinus || !btnQtyPlus || !qtyInput) return;

    btnQtyMinus.addEventListener("click", () => {
      if (state.quantity > 1) {
        state.quantity--;
        qtyInput.value = state.quantity;
        updatePriceUI();
      }
    });

    btnQtyPlus.addEventListener("click", () => {
      if (state.quantity < 10) {
        state.quantity++;
        qtyInput.value = state.quantity;
        updatePriceUI();
      }
    });
  }

  /* ---------------- View Routing & Navigation (واجهة المتجر vs صفحة المنتج المستقلة) ---------------- */
  function showStorefront(skipHash) {
    const vStore = $("#view-storefront");
    const vProd = $("#view-product-page");
    const heroBanner = $(".store-hero-banner");
    const mobileBar = $("#mobile-sticky-bar");

    if (vStore) vStore.style.display = "";
    if (vProd) vProd.style.display = "none";
    if (heroBanner) heroBanner.style.display = "";
    if (mobileBar) mobileBar.style.display = "none";

    $$(".store-nav-bar .nav-tab").forEach((t) => {
      if (t.getAttribute("data-category") === "all") t.classList.add("active");
      else t.classList.remove("active");
    });

    if (!skipHash && window.location.hash) {
      history.pushState(null, "", window.location.pathname);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showProductPage(productId, colorId, size, skipHash) {
    const vStore = $("#view-storefront");
    const vProd = $("#view-product-page");
    const heroBanner = $(".store-hero-banner");
    const mobileBar = $("#mobile-sticky-bar");

    if (!PRODUCTS[productId]) productId = "coat";

    switchProduct(productId, colorId, size);

    if (vStore) vStore.style.display = "none";
    if (vProd) vProd.style.display = "block";
    if (heroBanner) heroBanner.style.display = "none";
    if (mobileBar) mobileBar.style.display = "flex";

    const crumb = $("#crumb-product-name");
    if (crumb) crumb.textContent = PRODUCTS[productId].shortName;

    // Highlight category tab
    const cat = PRODUCTS[productId].category;
    $$(".store-nav-bar .nav-tab").forEach((t) => {
      if (t.getAttribute("data-category") === cat) t.classList.add("active");
      else t.classList.remove("active");
    });

    if (!skipHash && window.location.hash !== `#${productId}`) {
      history.pushState(null, "", `#${productId}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initRouting() {
    function handleRoute() {
      const hash = window.location.hash.replace("#", "").trim();
      if (hash === "coat" || hash === "polo" || hash === "spiderman") {
        showProductPage(hash, null, null, true);
      } else {
        showStorefront(true);
      }
    }

    window.addEventListener("popstate", handleRoute);

    const btnBack = $("#btn-back-to-store");
    if (btnBack) {
      btnBack.addEventListener("click", (e) => {
        e.preventDefault();
        showStorefront();
      });
    }

    // Hero buttons
    const heroBrowse = $(".btn-hero-primary");
    if (heroBrowse) {
      heroBrowse.addEventListener("click", (e) => {
        e.preventDefault();
        showStorefront();
        const catalogEl = $("#store-catalog");
        if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
      });
    }

    const heroDetails = $(".btn-hero-secondary");
    if (heroDetails) {
      heroDetails.addEventListener("click", (e) => {
        e.preventDefault();
        showProductPage("coat");
      });
    }

    handleRoute();
  }

  /* ---------------- Category Filter Tabs ---------------- */
  function initCategoryTabs() {
    const tabs = $$(".store-nav-bar .nav-tab");

    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        const category = tab.getAttribute("data-category");

        if (category === "all") {
          showStorefront();
        } else if (category === "men") {
          showProductPage("coat");
        } else if (category === "polo") {
          showProductPage("polo");
        } else if (category === "pajama") {
          showProductPage("spiderman");
        }
      });
    });
  }

  /* ---------------- Catalog Cards (الضغط على منتوج يدخلك إلى صفحته المستقلة) ---------------- */
  function initCatalogButtons() {
    $$(".store-product-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const prodId = card.getAttribute("data-product-id");
        if (prodId && PRODUCTS[prodId]) {
          showProductPage(prodId);
        }
      });
    });
  }

  /* ---------------- Countdown Timer ---------------- */
  function initCountdownTimer() {
    if (!topTimer) return;

    let totalSeconds = 14 * 60 + 32;
    const timerKey = "menara_store_timer_end";
    const savedEnd = localStorage.getItem(timerKey);
    const now = Date.now();

    let endTime;
    if (savedEnd && Number(savedEnd) > now) {
      endTime = Number(savedEnd);
    } else {
      endTime = now + totalSeconds * 1000;
      localStorage.setItem(timerKey, String(endTime));
    }

    function tick() {
      const remainingMs = endTime - Date.now();
      if (remainingMs <= 0) {
        endTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem(timerKey, String(endTime));
      }
      const remSec = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      const hours = Math.floor(remSec / 3600);
      const mins = Math.floor((remSec % 3600) / 60);
      const secs = remSec % 60;

      const pad = (n) => String(n).padStart(2, "0");
      topTimer.textContent = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- FAQ Accordion ---------------- */
  function initFaq() {
    $$(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        if (!item) return;
        const isOpen = item.classList.contains("open");
        $$(".faq-item").forEach((i) => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });
  }

  /* ---------------- Moroccan Cities Selector ---------------- */
  const MOROCCAN_CITIES = [
    "آسفي", "آيت ملول", "أبي الجعد", "أزرو", "أزيلال", "أصيلة", "أكادير", "أرفود", "إفران", "إمزورن",
    "إنزكان", "ابن جرير", "ابن سليمان", "البروج", "بئر جديد", "بوعرفة", "بوزنيقة", "بولمان", "بني ملال",
    "بركان", "برشيد", "تارودانت", "تازة", "تاونات", "تاوريرت", "تاهلة", "تحناوت", "تطوان", "تمارة",
    "تنغير", "تيزنيت", "تيفلت", "جرسيف", "جرادة", "الجديدة", "الحسيمة", "خريبكة", "خنيفرة", "الخميسات",
    "الداخلة", "الدار البيضاء", "الدروة", "دريوش", "دمنات", "الرشيدية", "الرباط", "الريش", "زاكورة",
    "زايو", "سطات", "سلا", "سيدي إفني", "سيدي بنور", "سيدي رحال", "سيدي سليمان", "سيدي قاسم",
    "سيدي يحيى الغرب", "شفشاون", "الشماعية", "الصخيرات", "الصويرة", "طرفاية", "طانطان", "طنجة", "طاطا",
    "العرائش", "العيون", "فاس", "الفنيدق", "الفقيه بن صالح", "كلميم", "القصر الكبير", "القنيطرة",
    "قلعة السراغنة", "مارتيل", "مراكش", "مشرع بلقصيري", "المضيق", "المحمدية", "مكناس", "مولاي يعقوب",
    "ميدلت", "ميسور", "الناظور", "النواصر", "ورزازات", "وزان", "وادي زم", "وجدة", "ولماس", "اليوسفية"
  ];

  function initCitySelector() {
    const btnMoreCities = $("#btn-more-cities");
    const btnCityIcon = $("#btn-city-icon");
    const btnCloseCities = $("#btn-close-cities");
    const citiesDropdownPanel = $("#cities-dropdown-panel");
    const allCitiesContainer = $("#all-cities-container");
    const citiesPanelFilter = $("#cities-panel-filter");
    const cityInput = $("#customer-city");
    const cityFieldWrap = $(".city-form-field");

    if (!citiesDropdownPanel || !allCitiesContainer || !cityInput) return;

    allCitiesContainer.innerHTML = MOROCCAN_CITIES.map((c) => {
      return `<button type="button" class="city-item-btn" data-city="${c}">${c}</button>`;
    }).join("");

    function openCities() {
      citiesDropdownPanel.style.display = "flex";
      if (citiesPanelFilter) {
        citiesPanelFilter.value = "";
        filterCities("");
        setTimeout(() => citiesPanelFilter.focus(), 80);
      }
    }

    function closeCities() {
      citiesDropdownPanel.style.display = "none";
    }

    function toggleCities() {
      if (citiesDropdownPanel.style.display === "flex") {
        closeCities();
      } else {
        openCities();
      }
    }

    if (btnMoreCities) btnMoreCities.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCities();
    });

    if (btnCityIcon) btnCityIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCities();
    });

    if (btnCloseCities) btnCloseCities.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCities();
    });

    document.addEventListener("click", (e) => {
      if (cityFieldWrap && !cityFieldWrap.contains(e.target)) {
        closeCities();
      }
    });

    citiesDropdownPanel.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-city]");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const city = btn.getAttribute("data-city");
      if (city) {
        cityInput.value = city;
        const cityErr = $("#city-error");
        if (cityErr) cityErr.style.display = "none";
        closeCities();
        const addressInput = $("#customer-address");
        if (addressInput) addressInput.focus();
      }
    });

    function filterCities(term) {
      const q = term.trim().toLowerCase();
      const items = allCitiesContainer.querySelectorAll(".city-item-btn");
      items.forEach((item) => {
        const text = item.getAttribute("data-city") || "";
        if (!q || text.includes(q)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    }

    if (citiesPanelFilter) {
      citiesPanelFilter.addEventListener("input", (e) => {
        filterCities(e.target.value);
      });
    }

    cityInput.addEventListener("input", (e) => {
      if (citiesDropdownPanel.style.display === "flex") {
        filterCities(e.target.value);
      }
    });
  }

  /* ---------------- Phone Helpers & Validation ---------------- */
  function normalizePhone(phone) {
    let val = String(phone || "").replace(/[\s\-().]/g, "").replace(/[^\d+]/g, "");
    if (val.startsWith("+212")) val = "0" + val.slice(4);
    else if (val.startsWith("00212")) val = "0" + val.slice(5);
    else if (val.startsWith("212")) val = "0" + val.slice(3);
    else if (/^[5-7]\d{8}$/.test(val)) val = "0" + val;
    return val;
  }

  function isValidMoroccanPhone(phone) {
    const val = normalizePhone(phone);
    return /^(?:\+212|00212|0)[5-7]\d{8}$/.test(val);
  }

  /* ---------------- Meta Pixel Tracking Helper ---------------- */
  function trackPixel(eventName, data = {}) {
    try {
      if (typeof window.fbq === "function") {
        window.fbq("track", eventName, data);
      }
    } catch (_) {}
  }

  /* ---------------- Order Storage ---------------- */
  function saveOrderLocally(order) {
    try {
      const orders = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_ORDERS) || "[]");
      orders.unshift(order);
      if (orders.length > 50) orders.length = 50;
      localStorage.setItem(CONFIG.STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (_) {}
  }

  /* ---------------- Send Order to Cloud ---------------- */
  async function dispatchOrder(order) {
    const webhookUrl = CONFIG.GOOGLE_SHEET_WEBHOOK;
    const jsonStr = JSON.stringify(order);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: jsonStr,
        keepalive: true,
      });
    } catch (_) {
      try {
        if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
          const blob = new Blob([jsonStr], { type: "text/plain;charset=utf-8" });
          navigator.sendBeacon(webhookUrl, blob);
        }
      } catch (__) {}
    }

    return true;
  }

  /* ---------------- Order Form Submission ---------------- */
  function initOrderForm() {
    if (!orderForm) return;

    orderForm.addEventListener("focusin", () => {
      if (!state.checkoutTracked) {
        state.checkoutTracked = true;
        const { total, prod } = calculateTotal();
        trackPixel("InitiateCheckout", {
          content_name: prod.name,
          value: total,
          currency: "MAD",
          num_items: state.quantity,
        });
      }
    });

    if (customerName) customerName.addEventListener("input", updateWhatsAppDirectLink);

    orderForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (state.submitting) return;

      const name = customerName ? customerName.value.trim() : "";
      const rawPhone = customerPhone ? customerPhone.value.trim() : "";
      const phone = normalizePhone(rawPhone);
      const city = customerCity ? customerCity.value.trim() : "";
      const address = customerAddress ? customerAddress.value.trim() : "";
      const note = customerNote ? customerNote.value.trim() : "";

      const nameErr = $("#name-error");
      const phoneErr = $("#phone-error");
      const cityErr = $("#city-error");

      if (nameErr) nameErr.style.display = "none";
      if (phoneErr) phoneErr.style.display = "none";
      if (cityErr) cityErr.style.display = "none";

      let hasError = false;

      if (!name || name.length < 2) {
        if (nameErr) {
          nameErr.textContent = "يرجى إدخال اسمكم الكريم (حرفين على الأقل).";
          nameErr.style.display = "block";
        }
        if (customerName) customerName.focus();
        hasError = true;
      } else if (!isValidMoroccanPhone(rawPhone)) {
        if (phoneErr) {
          phoneErr.textContent = "يرجى إدخال رقم هاتف مغربي صحيح (مثال: 0612345678).";
          phoneErr.style.display = "block";
        }
        if (customerPhone) customerPhone.focus();
        hasError = true;
      } else if (!city) {
        if (cityErr) {
          cityErr.textContent = "يرجى تحديد المدينة للتوصيل المجاني.";
          cityErr.style.display = "block";
        }
        if (customerCity) customerCity.focus();
        hasError = true;
      }

      if (hasError) return;

      // Prepare order object with complete details for dashboard and operator
      const { total, unitPrice, prod } = calculateTotal();
      const orderId = `#${Math.floor(100000 + Math.random() * 900000)}`;
      const nowIso = new Date().toISOString();
      const curColor = prod.colors.find((c) => c.id === state.selectedColorId) || prod.colors[0];

      const order = {
        orderId,
        id: orderId,
        customerName: name,
        name: name,
        fullName: name,
        customerPhone: phone,
        phone: phone,
        customerCity: city,
        city: city,
        address: address || "غير محدد",
        product: prod.name,
        productName: prod.name,
        productId: state.currentProductId,
        color: state.selectedColorName,
        colorId: state.selectedColorId,
        size: state.selectedSize,
        age: state.selectedSize,
        pack: state.selectedPackName,
        quantity: state.quantity,
        pieces: state.quantity * (state.isDouble ? (state.currentProductId === "spiderman" ? 6 : 2) : (state.currentProductId === "spiderman" ? 3 : 1)),
        price: total,
        total: total,
        bundlePrice: total,
        unitPrice: unitPrice,
        image: curColor.img,
        note: note,
        shipping: "مجاني",
        status: "pending",
        source: "menara_store",
        createdAt: nowIso,
        timestamp: nowIso,
      };

      state.submitting = true;
      btnSubmitOrder.disabled = true;
      submitText.textContent = "جاري تأكيد وتسجيل طلبك...";

      // Save locally immediately
      saveOrderLocally(order);

      // Send to Google Sheets in background/parallel
      try {
        await Promise.race([
          dispatchOrder(order),
          new Promise((resolve) => setTimeout(resolve, 2500)),
        ]);
      } catch (_) {}

      // Fire Meta Pixel Purchase event
      trackPixel("Purchase", {
        content_name: prod.name,
        content_type: "product",
        value: total,
        currency: "MAD",
        num_items: state.quantity,
        order_id: orderId,
      });

      // Fire Lead event
      trackPixel("Lead", {
        content_name: prod.name,
        value: total,
        currency: "MAD",
        order_id: orderId,
      });

      // Show success modal
      if (modalOrderId) modalOrderId.textContent = orderId;
      if (modalWhatsappBtn) {
        const waText = `سلام متجر منارة، أنا ${name} من ${city}. قمت بتسجيل طلب ${prod.name} (${state.selectedColorName} - مقاس: ${state.selectedSize} - كمية: ${state.quantity}) برقم ${orderId} بمبلغ ${total} درهم. أرجو تأكيد إرسال الطلبية وشكراً!`;
        modalWhatsappBtn.href = `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(waText)}`;
      }

      if (orderSuccessModal) orderSuccessModal.classList.add("show");

      // Reset form
      orderForm.reset();
      state.quantity = 1;
      if (qtyInput) qtyInput.value = "1";
      updatePriceUI();

      state.submitting = false;
      btnSubmitOrder.disabled = false;
      submitText.textContent = "اضغط هنا لتأكيد الطلب الآن 🛍️";
    });
  }

  /* ---------------- Modal Events ---------------- */
  function initModal() {
    if (!orderSuccessModal) return;

    if (btnCloseModal) {
      btnCloseModal.addEventListener("click", () => {
        orderSuccessModal.classList.remove("show");
      });
    }

    orderSuccessModal.addEventListener("click", (e) => {
      if (e.target === orderSuccessModal) {
        orderSuccessModal.classList.remove("show");
      }
    });
  }

  /* ---------------- Mobile Sticky Bar Scroll ---------------- */
  function initMobileBar() {
    const msbOrderBtn = $("#msb-order-btn");
    if (!msbOrderBtn) return;

    msbOrderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const formEl = $("#order-form-container");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        if (customerName) setTimeout(() => customerName.focus(), 500);
      }
    });
  }

  /* ---------------- Initialization ---------------- */
  function init() {
    renderProductUI();
    initColorAndGalleryControls();
    initSizeSelector();
    initPackCards();
    initQuantityControls();
    initCategoryTabs();
    initCatalogButtons();
    initCountdownTimer();
    initFaq();
    initCitySelector();
    initOrderForm();
    initModal();
    initMobileBar();
    initRouting();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

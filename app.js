/*
 * AI Nish portfolio settings
 * Add your real destinations here before publishing.
 */
const SITE_CONFIG = {
  whatsappNumber: "918179197176", // India country code + the supplied number
  instagramUrl: "https://www.instagram.com/ai_nish_/",
  instagramHandle: "@ai_nish_",
  instagramReelUrls: [],     // Optional Reel URLs in the same order as the four preview cards
  location: "India · Working everywhere",
  projectFormUrl: "",       // Google Form responder URL
  reviewFormUrl: ""         // Optional Google Form for reviews; falls back to project form
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const toast = (message) => {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2800);
};
const safeText = (value) => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"}[char]));

$("#year").textContent = new Date().getFullYear();
$(".service-text p").textContent = "Reels, Shorts & TikToks with captions in the language your audience speaks.";
$(".contact-foot span:first-child").textContent = "OPEN FOR NEW PROJECTS";
const tutorialDisclaimer = document.createElement("p");
tutorialDisclaimer.className = "tutorial-disclaimer";
tutorialDisclaimer.textContent = "TUTORIAL CONCEPTS · ADD YOUR OWN WALKTHROUGHS WITH ‘UPLOAD A TUTORIAL’";
$(".tutorial-grid").after(tutorialDisclaimer);
$("[data-location-display]").textContent = SITE_CONFIG.location || "Add your location";
if (SITE_CONFIG.whatsappNumber) {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  $$('[data-whatsapp]').forEach((link) => link.href = `https://wa.me/${number}`);
  $("[data-phone-display]").textContent = number.startsWith("91") && number.length === 12 ? `+91 ${number.slice(2, 7)} ${number.slice(7)}` : `+${number}`;
} else {
  $$('[data-whatsapp]').forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); toast("Add your WhatsApp number in app.js to activate this link."); }));
}
if (SITE_CONFIG.instagramUrl) {
  $$('[data-instagram]').forEach((link) => { link.href = SITE_CONFIG.instagramUrl; link.target = "_blank"; link.rel = "noopener noreferrer"; });
  $$('[data-instagram-display]').forEach((el) => el.textContent = SITE_CONFIG.instagramHandle || "Visit Instagram");
} else {
  $$('[data-instagram]').forEach((link) => link.addEventListener("click", (event) => {
    const reelIndex = $$(".insta-grid [data-instagram]").indexOf(link);
    if (reelIndex >= 0 && SITE_CONFIG.instagramReelUrls[reelIndex]) return;
    event.preventDefault(); toast("Add your Instagram profile in app.js to activate this link.");
  }));
}
if (Array.isArray(SITE_CONFIG.instagramReelUrls)) {
  $$(".insta-grid [data-instagram]").forEach((link, index) => {
    const reelUrl = SITE_CONFIG.instagramReelUrls[index];
    if (reelUrl) { link.href = reelUrl; link.target = "_blank"; link.rel = "noopener noreferrer"; }
  });
}
const projectFormLink = $("[data-form]");
if (SITE_CONFIG.projectFormUrl) {
  projectFormLink.href = SITE_CONFIG.projectFormUrl;
  projectFormLink.target = "_blank";
  projectFormLink.rel = "noopener noreferrer";
} else {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  if (number) {
    projectFormLink.href = `https://wa.me/${number}?text=${encodeURIComponent("Hi AI Nish! I would like to discuss a video project. Here are my requirements:")}`;
    projectFormLink.target = "_blank"; projectFormLink.rel = "noopener noreferrer";
  } else {
    projectFormLink.addEventListener("click", (event) => { event.preventDefault(); toast("Add your Google Form link in app.js to receive project briefs."); });
  }
}
$("[data-review-form]")?.addEventListener("click", (event) => {
  const target = SITE_CONFIG.reviewFormUrl || SITE_CONFIG.projectFormUrl;
  if (!target && SITE_CONFIG.whatsappNumber) {
    event.currentTarget.href = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi AI Nish! I would like to share feedback about a project we worked on.")}`;
    event.currentTarget.target = "_blank"; event.currentTarget.rel = "noopener noreferrer";
  }
  else if (!target) { event.preventDefault(); toast("Add a review or project Google Form link in app.js."); }
  else { event.currentTarget.href = target; event.currentTarget.target = "_blank"; event.currentTarget.rel = "noopener noreferrer"; }
});

const menuToggle = $(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("mobile-nav-open", open);
});
$$(".nav-links a").forEach((link) => link.addEventListener("click", () => {
  document.body.classList.remove("mobile-nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const workGrid = $("#work-grid");
$$('.service-row').forEach((row) => {
  const arrow = $(".service-arrow", row);
  if (!arrow) return;
  const link = document.createElement("a");
  link.className = "service-arrow";
  link.href = "#contact";
  link.setAttribute("aria-label", `Ask about ${$("h3", row).textContent}`);
  link.textContent = "↗";
  arrow.replaceWith(link);
});
const videoProjects = [
  {title:"The Art of Fragrance",kind:"PERFUME · PRODUCT FILM",category:"product",src:"videos/perfume-ad.mp4",description:"A perfume ad focused on mood, detail and the small moments that make a fragrance feel memorable."},
  {title:"A Fragrance, Reimagined",kind:"PERFUME · CAMPAIGN EDIT",category:"product",src:"videos/perfume-ad-2.mp4",description:"A second fragrance concept with its own visual rhythm, giving this scent a distinct place in the collection."},
  {title:"A Clearer Kind of Glow",kind:"SKINCARE · SERUM AD",category:"beauty",src:"videos/serum-ad.mp4",description:"A skincare product story that brings the serum into focus through clean product-led visuals."},
  {title:"Skincare in Its Element",kind:"SKINCARE · PRODUCT FILM",category:"beauty",src:"videos/serum-ad-2.mp4",description:"Another serum edit, showing a different creative take on a beauty product and its everyday ritual."},
  {title:"Carry Your Own Story",kind:"ACCESSORIES · BAG AD",category:"fashion",src:"videos/bag-ad.mp4",description:"A bag campaign that puts the accessory at the centre and gives its details room to speak."},
  {title:"A Little Bite of Joy",kind:"FOOD · CHOCOLATE AD",category:"product",src:"videos/chocolate-ad.mp4",description:"A chocolate ad built around an indulgent product moment and a playful, sensory feel."},
  {title:"The Everyday Heirloom",kind:"JEWELLERY · PRODUCT FILM",category:"fashion",src:"videos/jewelry-ad.mp4",description:"A jewellery showcase that draws attention to the pieces, their finish and the way they catch the eye."},
  {title:"Details That Catch the Light",kind:"JEWELLERY · CAMPAIGN EDIT",category:"fashion",src:"videos/jewelry-ad-2.mp4",description:"A second jewellery edit with a different cut, highlighting fine details and styling."},
  {title:"A Day at the Mall",kind:"RETAIL · LOCATION STORY",category:"lifestyle",src:"videos/shopping-mall.mp4",description:"A visit through a shopping destination, turning the space and its atmosphere into the story."},
  {title:"Drape Yourself in Tradition",kind:"SAREE · FASHION AD",category:"fashion",src:"videos/saree-ad.mp4",description:"A saree campaign celebrating colour, drape and the expressive detail of traditional fashion."}
];
function renderPortfolio() {
  workGrid.innerHTML = videoProjects.map((project, index) => `<article class="work-card portfolio-video-card ${index === 0 || index === 4 ? "work-large" : ""}" data-category="${project.category}" data-title="${safeText(project.title)}" data-kind="${safeText(project.kind)}" data-src="${project.src}" data-description="${safeText(project.description)}"><button class="work-image" aria-label="Play ${safeText(project.title)}"><video class="work-preview-video" muted playsinline loop preload="metadata" src="${project.src}"></video><span class="card-overlay"><span class="card-play">▶</span><span class="card-watch">PLAY FILM</span></span></button><div class="work-meta"><span><b>${String(index + 1).padStart(2,"0")}</b> · ${safeText(project.kind)}</span><span>PLAY PROJECT ↗</span></div><h3>${safeText(project.title)}</h3><p class="work-description">${safeText(project.description)}</p></article>`).join("");
  const feature = document.createElement("video");
  feature.className = "hero-featured-video";
  feature.muted = true; feature.loop = true; feature.autoplay = true; feature.playsInline = true; feature.preload = "metadata";
  feature.src = videoProjects[0].src;
  $(".hero-image").style.backgroundImage = "none";
  $(".hero-visual").insertBefore(feature, $(".hero-image-shade"));
  const aboutFeature = document.createElement("video");
  aboutFeature.className = "about-feature-video"; aboutFeature.muted = true; aboutFeature.loop = true; aboutFeature.autoplay = true; aboutFeature.playsInline = true; aboutFeature.preload = "metadata";
  aboutFeature.src = videoProjects[8].src;
  $(".about-photo").style.backgroundImage = "none";
  $(".about-photo").prepend(aboutFeature);
  $(".about-photo-label").textContent = "AI NISH · STORIES IN MOTION";
  $(".caption-kicker").textContent = `FEATURED · ${videoProjects[0].kind}`;
  $(".caption-title").innerHTML = `${safeText(videoProjects[0].title)}<span>✳</span>`;
  $(".caption-sub").textContent = "AI NISH · PRODUCT FILM";
  $(".work-foot > span:first-child").textContent = "10 ORIGINAL VIDEO ADS · YOUR WORK, YOUR POINT OF VIEW";
  $("#play-reel").addEventListener("click", () => openVideo(videoProjects[0].title, videoProjects[0].kind, videoProjects[0].src, "", videoProjects[0].description));
}
renderPortfolio();
const socialProjects = [2, 6, 8, 9];
$(".instagram-section .section-head h2").innerHTML = "More <em>work in motion.</em>";
$(".instagram-section .insta-note").textContent = "Connect Instagram and add public Reel links in app.js to send visitors to your original posts.";
$$('.insta-grid [data-instagram]').forEach((tile, index) => {
  const project = videoProjects[socialProjects[index]];
  if (!project) return;
  const preview = document.createElement("video");
  preview.className = "social-preview-video"; preview.src = project.src; preview.muted = true; preview.loop = true; preview.playsInline = true; preview.preload = "metadata";
  tile.prepend(preview);
  $(".insta-type", tile).textContent = `${project.kind} · FEATURED FILM`;
  $("b", tile).textContent = project.title;
  tile.addEventListener("click", (event) => {
    const reelUrl = SITE_CONFIG.instagramReelUrls[index];
    if (reelUrl || SITE_CONFIG.instagramUrl) return;
    event.preventDefault();
    openVideo(project.title, project.kind, project.src, "", project.description);
  });
});
$(".instagram-section .insta-link").textContent = "Instagram profile";
$(".instagram-section .insta-link").insertAdjacentHTML("beforeend", " <span>↗</span>");
if ("IntersectionObserver" in window) {
  const mediaObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) video.play().catch(() => {});
    else { video.pause(); video.currentTime = 0; }
  }), {threshold: 0.15, rootMargin: "100px 0px"});
  $$(".work-preview-video, .social-preview-video").forEach((video) => mediaObserver.observe(video));
}
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), {threshold: 0.12});
  $$(".work-card, .service-row, .price-card, .tutorial-card").forEach((element) => { element.classList.add("reveal-on-scroll"); revealObserver.observe(element); });
}
workGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".portfolio-video-card");
  if (card) openVideo(card.dataset.title, card.dataset.kind, card.dataset.src, "", card.dataset.description);
});
workGrid.addEventListener("pointerover", (event) => {
  const card = event.target.closest(".portfolio-video-card");
  if (card) $("video", card).play().catch(() => {});
});
workGrid.addEventListener("pointerout", (event) => {
  const card = event.target.closest(".portfolio-video-card");
  if (card && !card.contains(event.relatedTarget)) { const video = $("video", card); video.pause(); video.currentTime = 0; }
});
$$(".filter").forEach((button) => button.addEventListener("click", () => {
  $$(".filter").forEach((filter) => filter.classList.remove("active"));
  button.classList.add("active");
  const category = button.dataset.filter;
  $$(".work-card", workGrid).forEach((card) => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
}));

const videoModal = $("#video-modal");
const modalVideo = $("#modal-video");
function openVideo(title, kind, source, image, description = "Your video, ready to watch.") {
  $(".modal-title", videoModal).textContent = title;
  $(".modal-kind", videoModal).textContent = kind;
  $(".modal-caption p", videoModal).textContent = description;
  const frame = $(".video-frame", videoModal);
  if (source) {
    modalVideo.src = source;
    modalVideo.poster = image || "";
    frame.classList.add("has-video");
    modalVideo.load();
  } else {
    modalVideo.pause(); modalVideo.removeAttribute("src"); modalVideo.load();
    frame.classList.remove("has-video");
  }
  videoModal.showModal();
}

// IndexedDB keeps uploaded preview clips available across page refreshes on this device.
const DB_NAME = "ai-nish-creator-library";
const STORE_NAME = "videos";
function openLibrary() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function libraryAction(mode, record) {
  const db = await openLibrary();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode === "getAll" ? "readonly" : "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = mode === "getAll" ? store.getAll() : mode === "put" ? store.put(record) : store.delete(record);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}
function cardFor(record) {
  const card = document.createElement("article");
  const isTutorial = record.category === "tutorial";
  card.className = isTutorial ? "tutorial-card uploaded-tutorial" : "work-card uploaded-card";
  if (!isTutorial) card.dataset.category = record.category;
  card.dataset.uploadId = record.id;
  card.innerHTML = isTutorial
    ? `<button class="tutorial-cover uploaded-tutorial-cover" aria-label="Play ${safeText(record.title)}"><span>YOUR VIDEO · THIS DEVICE</span><b>${safeText(record.title)}</b><i>▶</i></button><div class="tutorial-meta"><span>YOUR TUTORIAL</span><button class="delete-upload" type="button">REMOVE</button></div><p>Uploaded to this browser's library.</p>`
    : `<button class="work-image uploaded-image" aria-label="Play ${safeText(record.title)}"><span class="uploaded-badge">YOUR VIDEO · THIS DEVICE</span><span class="card-overlay"><span class="card-play">▶</span></span></button><div class="work-meta"><span><b>✳</b> · ${record.category.toUpperCase()} / YOUR LIBRARY</span><button class="delete-upload" type="button">REMOVE</button></div><h3>${safeText(record.title)}</h3>`;
  const imageButton = isTutorial ? $(".tutorial-cover", card) : $(".work-image", card);
  const localUrl = URL.createObjectURL(record.blob);
  if (!isTutorial) {
    imageButton.style.backgroundImage = "linear-gradient(0deg,#10120d70,transparent 60%)";
    const preview = document.createElement("video");
    preview.className = "work-preview-video"; preview.src = localUrl; preview.muted = true; preview.loop = true; preview.playsInline = true; preview.preload = "metadata";
    imageButton.prepend(preview);
    imageButton.addEventListener("pointerenter", () => preview.play().catch(() => {}));
    imageButton.addEventListener("pointerleave", () => { preview.pause(); preview.currentTime = 0; });
  }
  imageButton.addEventListener("click", () => openVideo(record.title, `${record.category.toUpperCase()} · LOCAL PREVIEW`, localUrl, ""));
  $(".delete-upload", card).addEventListener("click", async () => {
    await libraryAction("delete", record.id);
    URL.revokeObjectURL(localUrl);
    card.remove();
    toast("Removed from this browser's library.");
  });
  return card;
}
async function showUploads() {
  try {
    const records = await libraryAction("getAll");
    records.forEach((record) => {
      if (!$(`[data-upload-id="${CSS.escape(record.id)}"]`)) {
        const card = cardFor(record);
        if (record.category === "tutorial") $("#tutorial-grid").append(card);
        else workGrid.append(card);
      }
    });
    const allFilter = $('.filter[data-filter="all"]');
    allFilter.querySelector("span").textContent = String($$(".work-card", workGrid).length).padStart(2, "0");
  } catch { /* Older/private browser modes may not allow IndexedDB. */ }
}
showUploads();

const uploadModal = $("#upload-modal");
const typeSelect = $("#video-category");
const tutorialOption = document.createElement("option");
tutorialOption.value = "tutorial";
tutorialOption.textContent = "Tutorial / How-to";
typeSelect.append(tutorialOption);
$("#upload-open").addEventListener("click", () => { typeSelect.value = "reels"; uploadModal.showModal(); });
const tutorialUpload = document.createElement("button");
tutorialUpload.className = "tutorial-upload";
tutorialUpload.type = "button";
tutorialUpload.innerHTML = "<span>＋</span> Upload a tutorial";
$(".tutorial-inner .section-head").append(tutorialUpload);
tutorialUpload.addEventListener("click", () => { typeSelect.value = "tutorial"; uploadModal.showModal(); });
$("#upload-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = $("#video-file").files[0];
  const error = $("#upload-error");
  error.textContent = "";
  if (!file) return;
  if (file.size > 100 * 1024 * 1024) { error.textContent = "This video is over 100 MB. Choose a smaller file."; return; }
  const record = { id: crypto.randomUUID(), title: $("#video-title").value.trim(), category: $("#video-category").value, blob: file, createdAt: Date.now() };
  try {
    await libraryAction("put", record);
    const card = cardFor(record);
    if (record.category === "tutorial") $("#tutorial-grid").prepend(card);
    else workGrid.prepend(card);
    $(".filter[data-filter='all']").click();
    $(".filter[data-filter='all'] span").textContent = String($$(".work-card", workGrid).length).padStart(2, "0");
    uploadModal.close(); event.target.reset(); toast("Added to your local portfolio preview.");
  } catch { error.textContent = "This browser could not save the video. Try a smaller file or a different browser."; }
});

// A lightweight creative prompt helper: hook, shot direction, and caption starter.
const promptModal = $("#prompt-modal");
const openPrompt = () => promptModal.showModal();
$("#prompt-open").addEventListener("click", openPrompt);
$("#prompt-open-2").addEventListener("click", openPrompt);
const hooks = ["Nobody tells you this about {thing}…", "A little look at the thing that makes {thing} different.", "POV: you finally found your new favourite {thing}.", "Here's a tiny change that makes {thing} feel like you.", "Wait for the detail that makes {thing} worth remembering."];
const shots = ["Start with a close detail in natural window light. Pull back to show the person using it, then finish on a quiet, satisfying hero shot.", "Open mid-action with a hand entering frame. Cut between one wide shot, two tactile close-ups and a candid human moment.", "Let the first shot move toward camera. Keep the next two cuts tight to the beat, then hold the final frame for one second.", "Film a simple before-and-after: a clean wide, a few quick process details, and one warm, natural reaction."];
const captions = ["Good things don't need to try too hard. Meet {thing} — made for the moments that matter to you.", "A little more {vibe}, a little less scrolling. Save this idea for your next one.", "Made with care, shared with you. What would your version of {thing} look like?"];
function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
$("#generate-idea").addEventListener("click", () => {
  const thing = $("#idea-type").value;
  const vibe = $("#idea-vibe").value;
  $("#idea-hook").textContent = pick(hooks).replaceAll("{thing}", thing);
  $("#idea-shot").textContent = `SHOT IDEA — ${pick(shots)}`;
  $("#idea-caption").textContent = `CAPTION STARTER — ${pick(captions).replaceAll("{thing}", thing).replaceAll("{vibe}", vibe)}`;
  $("#idea-result").classList.add("visible");
});
$("#copy-idea").addEventListener("click", async () => {
  const value = `${$("#idea-hook").textContent}\n\n${$("#idea-shot").textContent}\n\n${$("#idea-caption").textContent}`;
  try { await navigator.clipboard.writeText(value); toast("Idea copied to clipboard."); }
  catch { toast("Select and copy your idea from the card."); }
});

$$(".modal").forEach((modal) => {
  $(".modal-close", modal)?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
  modal.addEventListener("close", () => { if (modal === videoModal) { modalVideo.pause(); modalVideo.removeAttribute("src"); modalVideo.load(); } });
});

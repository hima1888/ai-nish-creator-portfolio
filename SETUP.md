# AI Nish creator portfolio

## Preview

Open `index.html` in a browser, or serve the `outputs` folder with any static web server. A local server is recommended for browser video-library support.

## Add your details

Open `app.js` and fill the `SITE_CONFIG` values near the top:

- `whatsappNumber`: your country code plus phone number, digits only.
- `instagramUrl` and `instagramHandle`: your real profile.
- `location`: city/region or the location wording you prefer.
- `projectFormUrl`: the public responder URL for your Google Form.
- `reviewFormUrl`: optional separate feedback form; otherwise the review link uses the project form.

The Google Form is the actual data collection destination. Create one at [forms.google.com](https://forms.google.com) with the title **AI Nish — Project Enquiry & Client Feedback**. Suggested fields:

- What are you contacting me about? (Project enquiry / Client feedback)
- Name and best contact (WhatsApp or email)
- Brand or business name, project type and video length/package
- Tell me about the video you need, your audience, and the goal
- Reference links, preferred language, budget range and target date
- For completed projects: rating, feedback, and permission to feature the feedback publicly

Set the form to accept responses from anyone with the link. Copy its responder URL into both `projectFormUrl` and `reviewFormUrl` in the settings. This static site does not store or email enquiry submissions itself.

## Videos and tutorials

The portfolio includes the ten supplied ads in `videos/`, grouped into beauty, fashion, product and lifestyle work. Each project has a playback modal and a short description. Use **Add a video** in the work section or **Upload a tutorial** in the Edit Room to add more previews. Those new uploads are saved in IndexedDB in the current browser on the current device, up to 100 MB each. This is useful for previewing and organizing content while building the site. It does not publish new video files to the public internet. For public uploads from any device, connect a storage service and a small admin backend before launch.

The sample work tiles and tutorial cards are concepts to demonstrate the layout. Replace them with your own video projects and tutorial content before publishing. The photographic backgrounds are remote Unsplash images used as visual placeholders.

## Before publishing

1. Add your WhatsApp number, Instagram account, location and Google Form URL.
2. Replace the concept projects and sample tutorial topics with your actual work.
3. Add your Instagram Reel links if you want the social previews to open individual posts.
4. Decide on a public video-hosting/admin setup if you need upload management from anywhere.
5. Confirm the agreement, revision and delivery terms match how you want to work.


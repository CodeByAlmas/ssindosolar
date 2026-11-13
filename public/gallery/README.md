# Photos and videos: which folder
Drop files into the matching folder. Names do not matter, but files show in filename order (01.jpg, 02.jpg ...). 01 becomes the cover photo.

## Projects (photos AND videos)
public/gallery/projects/<project>/
  - any .jpg/.png/.webp  -> "Photos" section of that project
  - any .mp4/.webm       -> "Videos" section of that project (title comes from the file name: "01-site-walkthrough.mp4" -> "site walkthrough")
  - optional: keep things tidy with sub-folders  photos/  and  videos/  inside the project folder. Both layouts work.
Projects: govt-high-school-mambakkam-chennai | dts-madarsa-jajmau-kanpur | solar-water-pump-chaudagra-fatehpur | darul-uloom-deoband | aki-magarwara-unnao | vidyagyan-school-sitapur

## Installation process
public/gallery/process/<step>/  civil-foundation | structure-mounting | dc-ac-cabling | earthing | lightning-arrestor | commissioning

## Offices
office (Kanpur head office) | warehouse (Kanpur warehouse) | branches/kaimganj | branches/farrukhabad | branches/aligarh

## Other images
public/img/upneda-building.webp   photo of the UPNEDA building (home page UPNEDA card)
public/img/owner.webp             owner portrait (About page)

## Tips
- Photos: any size is fine (the site optimises them); keep each under ~5 MB.
- Videos: MP4 (H.264), 720p or 1080p, ideally under 20 MB each. Compress with HandBrake first. For long videos, host on YouTube and link instead.
- After adding files, refresh the page (restart `npm run dev` if it does not appear). On deploy, run `npm run build` again.

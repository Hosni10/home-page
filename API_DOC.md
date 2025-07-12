# Landing Page API Documentation

**Base URL:**  
`http://<your-server-domain>:<port>/api/`

---

## 1. Header (Slider)

| Method | Endpoint    | Description     | Body/Form Data                                                             | Notes                      |
| ------ | ----------- | --------------- | -------------------------------------------------------------------------- | -------------------------- |
| GET    | /header     | Get all sliders | -                                                                          |                            |
| POST   | /header     | Create a slider | `title` (string), `description` (string), `image1` (file), `image2` (file) | `multipart/form-data`      |
| PUT    | /header/:id | Update a slider | `title`, `description`, `image1` (file), `image2` (file)                   | Only send fields to update |
| DELETE | /header/:id | Delete a slider | -                                                                          |                            |

---

## 2. About Us

| Method | Endpoint   | Description       | Body Data                                                               | Notes                      |
| ------ | ---------- | ----------------- | ----------------------------------------------------------------------- | -------------------------- |
| GET    | /about     | Get about info    | -                                                                       |                            |
| POST   | /about     | Create about info | `title` (string), `description` (string), `points` (array of 4 strings) | JSON                       |
| PUT    | /about/:id | Update about info | `title`, `description`, `points` (array of 4 strings)                   | Only send fields to update |
| DELETE | /about/:id | Delete about info | -                                                                       |                            |

---

## 3. Services

| Method | Endpoint      | Description      | Body Data                                                                                    | Notes                      |
| ------ | ------------- | ---------------- | -------------------------------------------------------------------------------------------- | -------------------------- |
| GET    | /services     | Get all services | -                                                                                            |                            |
| POST   | /services     | Create services  | `title` (string), `description` (string), `cards` (array of objects: `{title, description}`) | JSON                       |
| PUT    | /services/:id | Update services  | `title`, `description`, `cards`                                                              | Only send fields to update |
| DELETE | /services/:id | Delete services  | -                                                                                            |                            |

---

## 4. Projects

| Method | Endpoint      | Description      | Body/Form Data                                           | Notes                      |
| ------ | ------------- | ---------------- | -------------------------------------------------------- | -------------------------- |
| GET    | /projects     | Get all projects | -                                                        |                            |
| POST   | /projects     | Create project   | `title` (string), `description` (string), `image` (file) | `multipart/form-data`      |
| PUT    | /projects/:id | Update project   | `title`, `description`, `image` (file)                   | Only send fields to update |
| DELETE | /projects/:id | Delete project   | -                                                        |                            |

---

## 5. Blog

| Method | Endpoint  | Description   | Body/Form Data                                                          | Notes                      |
| ------ | --------- | ------------- | ----------------------------------------------------------------------- | -------------------------- |
| GET    | /blog     | Get all blogs | -                                                                       |                            |
| POST   | /blog     | Create blog   | `title` (string), `description` (string), `date` (date), `image` (file) | `multipart/form-data`      |
| PUT    | /blog/:id | Update blog   | `title`, `description`, `date`, `image` (file)                          | Only send fields to update |
| DELETE | /blog/:id | Delete blog   | -                                                                       |                            |

---

## 6. Footer

| Method | Endpoint    | Description        | Body Data                                                                             | Notes                      |
| ------ | ----------- | ------------------ | ------------------------------------------------------------------------------------- | -------------------------- |
| GET    | /footer     | Get footer info    | -                                                                                     |                            |
| POST   | /footer     | Create footer info | `title` (string), `description` (string), `socials` (array of `{icon, link}` objects) | JSON                       |
| PUT    | /footer/:id | Update footer info | `title`, `description`, `socials`                                                     | Only send fields to update |
| DELETE | /footer/:id | Delete footer info | -                                                                                     |                            |

---

## **Image Upload Notes**

- For endpoints that require images, use `multipart/form-data` in Postman.
- The image fields are:
  - Header: `image1`, `image2`
  - Projects: `image`
  - Blog: `image`
- Uploaded images are accessible at:  
  `http://<your-server-domain>:<port>/uploads/<filename>`

---

## **Example: Creating a Project (POST /projects)**

- **Type:** `POST`
- **Body:** `form-data`
  - `title`: Modern Villa
  - `description`: Residential Construction
  - `image`: (choose file)

---

If you need sample Postman requests or a downloadable Postman collection, let me know!


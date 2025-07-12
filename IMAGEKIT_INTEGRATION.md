# ImageKit Integration

This application now uses ImageKit for cloud-based image storage instead of local file storage. **Multiple images are supported for all entities.**

## Environment Variables Required

Make sure to set up these environment variables in your `.env` file:

```
PUBLIC_IMAGEKIT_KEY=your_public_key_here
PRIVATE_IMAGEKIT_KEY=your_private_key_here
URL_ENDPOINT=your_url_endpoint_here
```

## How It Works

### Upload Middleware (`middleware/upload.js`)

- Changed from disk storage to memory storage
- Files are temporarily stored in memory before uploading to ImageKit
- Added helper functions:
  - `uploadToImageKit(file, folder)` - Uploads file to ImageKit
  - `deleteFromImageKit(fileId)` - Deletes file from ImageKit

### Database Models Updated

All models that handle images now include:

- Original image URL arrays (e.g., `image`, `image1`, `image2`)
- New `imageFileId` arrays to store ImageKit file IDs for cleanup

### Controllers Updated

#### Projects Controller

- Uploads multiple images to `projects` folder in ImageKit
- Stores arrays of image URLs and file IDs
- Cleans up old images when updating
- Deletes all images from ImageKit when deleting projects

#### Blog Controller

- Uploads multiple images to `blogs` folder in ImageKit
- Stores arrays of image URLs and file IDs
- Cleans up old images when updating
- Deletes all images from ImageKit when deleting blogs

#### Header Controller

- Handles multiple images for each field (`image1` and `image2`)
- Uploads images to `headers` folder in ImageKit
- Stores arrays of image URLs and file IDs
- Cleans up old images when updating
- Deletes all images from ImageKit when deleting headers

#### Services Controller

- Handles images for service cards
- Uploads images to `services` folder in ImageKit
- Processes multiple images per card
- Stores arrays of image URLs and file IDs
- Cleans up old images when updating
- Deletes all images from ImageKit when deleting services

## API Usage

### Projects

```
POST /api/projects
- Body: form-data with multiple image files
- Field name: "image" (up to 10 images)

PUT /api/projects/:id
- Body: form-data with multiple image files
- Field name: "image" (up to 10 images)
```

### Blogs

```
POST /api/blog
- Body: form-data with multiple image files
- Field name: "image" (up to 10 images)

PUT /api/blog/:id
- Body: form-data with multiple image files
- Field name: "image" (up to 10 images)
```

### Headers

```
POST /api/header
- Body: form-data with multiple image files
- Field names: "image1" (up to 10 images), "image2" (up to 10 images)

PUT /api/header/:id
- Body: form-data with multiple image files
- Field names: "image1" (up to 10 images), "image2" (up to 10 images)
```

### Services

```
POST /api/services
- Body: form-data with multiple image files
- Field names: "cards[0][images]", "cards[1][images]", etc. (up to 10 images per card)

PUT /api/services/:id
- Body: form-data with multiple image files
- Field names: "cards[0][images]", "cards[1][images]", etc. (up to 10 images per card)
```

## Benefits

1. **Cloud Storage**: Images are stored in the cloud instead of local server
2. **Multiple Images**: Support for uploading 1-10 images per entity
3. **Automatic Cleanup**: Old images are automatically deleted when updating
4. **Scalability**: No local storage limitations
5. **CDN**: Images are served through ImageKit's CDN for better performance
6. **File Management**: Proper file ID tracking for cleanup operations

## Error Handling

- Upload errors are caught and return appropriate error messages
- Delete operations are wrapped in try-catch to prevent failures
- File validation ensures only images are uploaded
- File size limit of 5MB per image
- Maximum 10 images per upload request

## Response Format

All responses now return arrays of image URLs:

```json
{
  "title": "Project Title",
  "description": "Project Description",
  "image": [
    "https://ik.imagekit.io/your-endpoint/projects/image1.jpg",
    "https://ik.imagekit.io/your-endpoint/projects/image2.jpg"
  ],
  "imageFileId": ["fileId1", "fileId2"]
}
```

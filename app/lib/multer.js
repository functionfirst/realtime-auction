// Middleware - Multer config
// Used for image uploads
var multer = require('multer');

function multerUploads() {
  return multer({
		dest: './public/uploads/',
 		rename: function (fieldname, filename) {
			return filename.toLowerCase() + Date.now();
		}
  }).single('file');
}
  
  module.exports = multerUploads;
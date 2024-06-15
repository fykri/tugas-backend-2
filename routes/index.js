const router = require('express').Router()
const { tampilData, tambahData, updateData, hapusData } = require('../controller/userController')

/**
 * Rute untuk menampilkan semua data pengguna.
 * @name get/
 * @function
 * @memberof module:routes
 * @inner
 * @param {string} path - Ekspresi jalur rute.
 * @param {function} tampilData - Middleware yang menangani rute.
 */
router.get('/', tampilData)

/**
 * Rute untuk menambahkan data pengguna baru.
 * @name post/insert
 * @function
 * @memberof module:routes
 * @inner
 * @param {string} path - Ekspresi jalur rute.
 * @param {function} tambahData - Middleware yang menangani rute.
 */
router.post('/insert', tambahData)

/**
 * Rute untuk memperbarui data pengguna.
 * @name put/update/:id_user
 * @function
 * @memberof module:routes
 * @inner
 * @param {string} path - Ekspresi jalur rute.
 * @param {function} updateData - Middleware yang menangani rute.
 */
router.put('/update/:id_user', updateData)

/**
 * Rute untuk menghapus data pengguna.
 * @name delete/delete/:id_user
 * @function
 * @memberof module:routes
 * @inner
 * @param {string} path - Ekspresi jalur rute.
 * @param {function} hapusData - Middleware yang menangani rute.
 */
router.delete('/delete/:id_user', hapusData)

module.exports = router

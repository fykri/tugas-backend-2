const { getAll, insert, update, remove } = require('../models/userModel')

/**
 * Menampilkan semua data pengguna.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
const tampilData = async(req, res)=> {
    const user = await getAll()
    if(user.length === 0) {
        res.status(404).json({msg: 'Table User Kosong'})
    }
    res.status(200).json({msg: 'user ada', data: user})
}

/**
 * Menambahkan data pengguna baru.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
const tambahData = async(req, res) => {
    const { nama, alamat } = req.body
    try {
        const user = await insert(nama, alamat)
        if(!user) {
            res.status(400).json({msg: 'gagal menambahkan user'})
        }
        res.status(200).send({msg : 'user berhasil ditambahkan'})
    } catch (err) {
        console.log('error insert', err);
    }
}

/**
 * Memperbarui data pengguna.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
const updateData = async(req, res)=> {
    const { id_user } = req.params
    const { nama, alamat } = req.body
    try {
        const user = await update(id_user, nama, alamat)
        if(!user) {
            res.status(400).json({msg: 'gagal Update user'})
        }
        res.status(200).json({msg: `data berhasil diupdate`})
    } catch(err){
        console.log('error update data ' + err);
    }
}

/**
 * Menghapus data pengguna.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
const hapusData = async(req, res)=> {
    const { id_user } = req.params
    console.log(typeof id_user);
    try {
        const user = await remove(id_user)
        if(!user) {
            res.status(400).json({msg: 'gagal menghapus data'})
        }
        res.status(200).json({msg: `data ${user.nama} berhasil dihapus`})
    } catch(err){
        console.log('error hapus data ' + err.message);
    }
}

module.exports = {
    tampilData,
    tambahData,
    updateData,
    hapusData
}

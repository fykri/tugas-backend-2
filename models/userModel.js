/**
 * Mengambil semua data pengguna dari tabel 'user'.
 * @returns {Promise<Array>} Daftar semua pengguna.
 */
const getAll = async() => {
    return await prisma.user.findMany()
}

/**
 * Menambahkan data pengguna baru ke tabel 'user'.
 * @param {string} nama - Nama pengguna.
 * @param {string} alamat - Alamat pengguna.
 * @returns {Promise<Object>} Data pengguna yang baru ditambahkan.
 */
const insert = async(nama, alamat)=> {
    return await prisma.user.create({
        data: {
            nama,
            alamat
        }
    })
}

/**
 * Memperbarui data pengguna di tabel 'user' berdasarkan ID pengguna.
 * @param {number} id_user - ID pengguna.
 * @param {string} nama - Nama baru pengguna.
 * @param {string} alamat - Alamat baru pengguna.
 * @returns {Promise<Object>} Data pengguna yang diperbarui.
 */
const update = async(id_user, nama, alamat)=> {
    const newIdUser = parseInt(id_user)
    return await prisma.user.update({
        where: {id_user: newIdUser},
        data: {
            nama,
            alamat
        }
    })
}

/**
 * Menghapus data pengguna dari tabel 'user' berdasarkan ID pengguna.
 * @param {number} id_user - ID pengguna.
 * @returns {Promise<Object>} Data pengguna yang dihapus.
 */
const remove = async(id_user)=> {
    const newIdUser = parseInt(id_user)
    console.log(typeof newIdUser);
    return await prisma.user.delete({
        where: {id_user: newIdUser}
    })
}

module.exports = {
    getAll,
    insert,
    update,
    remove
}

const { getAll, insert, update, remove } = require('../models/userModel');
const { tampilData, tambahData, updateData, hapusData } = require('../controller/userController');

jest.mock('../models/userModel');

describe('User Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    describe('tampilData', () => {
        it('harus mengembalikan 404 jika tidak ada pengguna yang ditemukan', async () => {
            getAll.mockResolvedValue([]);
            await tampilData(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Table User Kosong' });
        });

        it('harus mengembalikan 200 dengan data pengguna jika pengguna ditemukan', async () => {
            const users = [{ id: 1, nama: 'John Doe', alamat: '123 Street' }];
            getAll.mockResolvedValue(users);
            await tampilData(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'user ada', data: users });
        });
    });

    describe('tambahData', () => {
        it('harus mengembalikan 400 jika penambahan pengguna gagal', async () => {
            req.body = { nama: 'John Doe', alamat: '123 Street' };
            insert.mockResolvedValue(null);
            await tambahData(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'gagal menambahkan user' });
        });

        it('harus mengembalikan 200 jika pengguna berhasil ditambahkan', async () => {
            req.body = { nama: 'John Doe', alamat: '123 Street' };
            insert.mockResolvedValue(true);
            await tambahData(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ msg: 'user berhasil ditambahkan' });
        });

        it('harus mencatat kesalahan jika terjadi exception', async () => {
            console.log = jest.fn();
            req.body = { nama: 'John Doe', alamat: '123 Street' };
            const error = new Error('Insert Error');
            insert.mockRejectedValue(error);
            await tambahData(req, res);
            expect(console.log).toHaveBeenCalledWith('error insert', error);
        });
    });

    describe('updateData', () => {
        it('harus mengembalikan 400 jika pembaruan pengguna gagal', async () => {
            req.params = { id_user: 1 };
            req.body = { nama: 'John Doe', alamat: '123 Street' };
            update.mockResolvedValue(null);
            await updateData(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'gagal Update user' });
        });

        it('harus mengembalikan 200 jika pengguna berhasil diperbarui', async () => {
            req.params = { id_user: 1 };
            req.body = { nama: 'John Doe', alamat: '123 Street' };
            update.mockResolvedValue(true);
            await updateData(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'data berhasil diupdate' });
        });

        it('harus mencatat kesalahan jika terjadi exception', async () => {
            console.log = jest.fn();
            req.params = { id_user: 1 };
            req.body = { nama: 'John Doe', alamat: '123 Street' };
            const error = new Error('Update Error');
            update.mockRejectedValue(error);
            await updateData(req, res);
            expect(console.log).toHaveBeenCalledWith('error update data ' + error);
        });
    });

    describe('hapusData', () => {
        it('harus mengembalikan 400 jika penghapusan pengguna gagal', async () => {
            req.params = { id_user: 1 };
            remove.mockResolvedValue(null);
            await hapusData(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'gagal menghapus data' });
        });

        it('harus mengembalikan 200 jika pengguna berhasil dihapus', async () => {
            const user = { id_user: 1, nama: 'John Doe' };
            req.params = { id_user: 1 };
            remove.mockResolvedValue(user);
            await hapusData(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: `data ${user.nama} berhasil dihapus` });
        });

        it('harus mencatat kesalahan jika terjadi exception', async () => {
            console.log = jest.fn();
            req.params = { id_user: 1 };
            const error = new Error('Delete Error');
            remove.mockRejectedValue(error);
            await hapusData(req, res);
            expect(console.log).toHaveBeenCalledWith('error hapus data ' + error.message);
        });
    });
});

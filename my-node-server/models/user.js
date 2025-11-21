// models/user.js

module.exports = (sequelize, DataTypes) => {
    // Kritis: Mendefinisikan model dengan 'const User ='
    const User = sequelize.define('User', {
        // Atribut model User (Sesuai dengan kebutuhan registrasi & login)
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            // Role harus ditentukan (admin atau mahasiswa)
            type: DataTypes.ENUM('admin', 'mahasiswa'),
            allowNull: false,
        },
    }, {});

    // Mendefinisikan relasi User.hasMany(Presensi) 
    User.associate = function(models) {
        // Satu User memiliki banyak Presensi
        User.hasMany(models.Presensi, {
            foreignKey: 'userId', 
            as: 'Presensis', // Alias untuk digunakan saat mengambil data
        });
    };
    
    // Kritis: Mengembalikan objek model User
    return User;
};
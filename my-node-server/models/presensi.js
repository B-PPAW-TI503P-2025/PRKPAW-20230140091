// models/presensi.js
module.exports = (sequelize, DataTypes) => {
  const Presensi = sequelize.define('Presensi', {
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // Kolom 'userId' (foreign key) ditambahkan secara otomatis
  }, {});

  Presensi.associate = function(models) {
    // Relasi Presensi.belongsTo(User)
    Presensi.belongsTo(models.User, {
      foreignKey: 'userId', 
      as: 'User', // Penting untuk controller report
    });
  };
  return Presensi;
};
module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            year: DataTypes.INTEGER,
        },
    };
    const AlbumModel = connection.define('Album', schema); 
    return AlbumModel;
};
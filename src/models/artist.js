module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false, //NOT NULL
        },
        genre: DataTypes.STRING,
    };
    const ArtistModel = connection.define('Artist', schema); 
    return ArtistModel;
};
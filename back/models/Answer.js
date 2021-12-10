module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      answer: DataTypes.STRING,
    },
    {}
  );
  Answer.associate = function (models) {
    models.Answer.belongsTo(models.Question);
  };
  return Answer;
};

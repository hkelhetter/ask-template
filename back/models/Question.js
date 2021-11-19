module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      question: DataTypes.STRING,
      type: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {}
  );
  Question.associate = function (models) {
    models.Question.hasOne(models.Answer);
  };
  return Question;
};

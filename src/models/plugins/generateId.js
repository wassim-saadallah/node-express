module.exports = function(){

  return function generateId(schema){
    console.log(schema.model);
    schema.pre('validate', function(done) {
      var instance = this;
      var model = instance.model(instance.constructor.modelName);
      if (instance.id == null) {
        model.findOne().sort('-id').exec(function(err, maxInstance) {
          if (err) {
            return done(err);
          } else {
            if(maxInstance == null)
             instance.id = 0;
             else
            instance.id = maxInstance.id + 1;
            done();
          }
        });
      } else {
        done();
      }
    });
  }
};

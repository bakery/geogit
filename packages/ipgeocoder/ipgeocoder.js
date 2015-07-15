var databaseUrl = 'https://dl.dropboxusercontent.com/u/9224326/geogit/GeoLite2-City.mmdb.gz';

var DatabaseState = {
  NotLoaded: 'not-loaded',
  Loading: 'loading',
  Loaded: 'loaded',
  LoadFailed: 'failed' 
};

IPGeocoder = {
  load : function(){
    var self = this;

    if(self.databaseState !== DatabaseState.NotLoaded){
      return;
    }

    self.databaseState = DatabaseState.Loading;
    
    mmdbreader.open(databaseUrl,function(err,data){
      if(!err){
        self.databaseState = DatabaseState.Loaded;
        self.database = data;
      } else {
        self.databaseState = DatabaseState.LoadFailed;
      }
    });
  },

  geocode : function(ip, callback){
    if(this.databaseState === DatabaseState.Loaded){
      this.database.getGeoData(ip, callback);
    } else {
      switch(this.databaseState){
        case DatabaseState.NotLoaded:
        case DatabaseState.Loading:
          this.load();
          callback.call(this, new Error('Database is not ready yet'));
          break;
        case DatabaseState.LoadFailed:
          callback.call(this, new Error('Failed to load database'));
          break;
      }
    }
  }, 

  databaseState : DatabaseState.NotLoaded,
  database : null
};
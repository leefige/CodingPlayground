'use strict';

module.exports = app => {
  class MapService extends app.Service {
    async getId(body){
      try {
        const result = await app.mysql.get('map', { id: body.id});
        const map = JSON.parse(result.data);
        return {
          mapInitState: map.mapInitState,
          mapResource: map.mapResource,
          blocklyConfig: map.blocklyConfig,
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    async insertId(body){
      try {
        const sql = "create table if not exists map(" +
        "id VARCHAR(100)," +
        "data TEXT," +
        "primary key (id)" +
        ");";
        await app.mysql.query(sql);
        const _data = {
          mapInitState: {},
          mapResource: {
            backgroundArray: [
              0, 1, 2, 3, 4, 7, 8, 9,
              16, 50, 50, 50, 20, 23, 24, 25,
              32, 50, 50, 50, 36, 23, 24, 25,
              48, 49, 50, 51, 52, 23, 24, 25,
              64, 65, 66, 67, 68, 39, 40, 41,
              7, 8, 8, 8, 8, 8, 8, 9,
              23, 24, 24, 24, 24, 24, 24, 25,
              39, 40, 40, 40, 40, 40, 40, 41
            ],
            transparentArray: [
              183, 183, 183, 183, 183, 77, 110, 79, 
              183, 183, 183, 183, 183, 93, 183, 95, 
              183, 183, 115, 183, 183, 63, 183, 95, 
              183, 183, 183, 183, 183, 183, 183, 130, 
              183, 115, 183, 34, 183, 183, 183, 183, 
              183, 183, 183, 183, 183, 244, 183, 183, 
              183, 229, 230, 231, 183, 183, 114, 183, 
              183, 245, 246, 247, 183, 183, 183, 183, 
            ],
          },
          blocklyConfig: [{
            "name": "动作",
            "blocks": [{
                "type": "go"
            }, {
                "type": "turn_left"
            }, {
                "type": "turn_right"
            }]
        }],
        };

        const data = JSON.stringify(_data);
        //const data = querystring.stringify(body.data);
        const result = await app.mysql.insert('map', { id: 238, data: data });
        //const insertSuccess = result.affectedRows === 1;
        //return insertSuccess;
        return data;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return MapService;
};


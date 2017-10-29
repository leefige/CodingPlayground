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
        const _data1 = {
          mapInitState: {
            board : {
              map : [[0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0]],
            },
            character : {
              pos : { x : 4, y : 4},
              dir : 2,
            },
          },
          mapResource: {
            width: 8,
            height: 8,
            id: [ 
                    0, 1, 2, 3, 4, 7, 8, 9,
                    16, 50, 50, 50, 20, 23, 24, 25,
                    32, 50, 50, 50, 36, 23, 24, 25,
                    48, 49, 50, 51, 52, 23, 24, 25,
                    64, 65, 66, 67, 68, 39, 40, 41,
                    7, 8, 8, 8, 8, 8, 8, 9,
                    23, 24, 24, 24, 24, 24, 24, 25,
                    39, 40, 40, 40, 40, 40, 40, 41
                  ],
            id_t: [
                      183, 183, 183, 183, 183, 77, 110, 79, 
                      183, 183, 183, 183, 183, 93, 183, 95, 
                      183, 183, 115, 183, 183, 63, 183, 95, 
                      183, 183, 183, 183, 183, 183, 183, 130, 
                      183, 115, 183, 34, 183, 183, 183, 183, 
                      183, 183, 183, 183, 183, 244, 183, 183, 
                      183, 229, 230, 231, 183, 183, 114, 183, 
                      183, 245, 246, 247, 183, 183, 183, 183
                    ]
          },
          blocklyConfig: {
            toolboxCategories: [{
            name: "动作",
            blocks: [{
                type: "go"
            }, {
                type: "turn_left"
            }, {
                type: "turn_right"
            }]
            }],
          }
        };

        const _data3 = {
          mapInitState: {
            board : {
              map : [[0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0]],
            },
            character : {
              pos : { x : 4, y : 4},
              dir : 2,
            },
          },
          mapResource: {
            "width": 8,
            "height": 8,
            "id": [ 
                    0, 1, 2, 3, 1, 2, 1, 4,
                    16, 50, 50, 50, 50, 50, 50, 36,
                    48, 50, 50, 50, 50, 50, 50, 52,
                    32, 50, 50, 50, 50, 50, 50, 52,
                    32, 50, 50, 50, 50, 50, 50, 52,
                    32, 50, 50, 50, 50, 50, 50, 36,
                    48, 50, 50, 50, 50, 50, 50, 52,
                    64, 67, 67, 65, 67, 65, 67, 68
                  ],
            "id_t": [
                      183, 77, 110, 110, 110, 110, 130, 79, 
                      183, 95, 176, 177, 178, 179, 180, 95, 
                      183, 95, 192, 193, 194, 195, 196, 95, 
                      183, 95, 208, 214, 210, 211, 212, 95, 
                      183, 95, 183, 199, 200, 201, 183, 95, 
                      183, 183, 183, 215, 216, 217, 183, 183, 
                      183, 115, 183, 183, 131, 183, 183, 183, 
                      183, 183, 183, 183, 183, 183, 183, 183 
                    ]
          },
          blocklyConfig: {
            toolboxCategories: [{
            name: "动作",
            blocks: [{
                type: "go"
            }, {
                type: "turn_left"
            }, {
                type: "turn_right"
            }]
            }],
          }
        };

        const _data4 = {
          mapInitState: {
            board : {
              map : [[0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0]],
            },
            character : {
              pos : { x : 4, y : 4},
              dir : 2,
            },
          },
          mapResource: {
            "width": 8,
            "height": 8,
            "id": [ 
                    122, 123, 123, 124, 123, 123, 124, 125,
                    138, 140, 140, 140, 140, 156, 140, 141,
                    138, 140, 140, 140, 140, 140, 140, 157,
                    154, 140, 140, 140, 140, 140, 140, 157,
                    154, 139, 140, 140, 140, 27, 140, 141,
                    138, 155, 140, 155, 140, 126, 127, 157,
                    138, 140, 140, 140, 27, 142, 143, 141,
                    170, 171, 172, 172, 171, 171, 172, 173
                  ],
            "id_t": [
                      183, 47, 47, 183, 183, 76, 183, 183,
                      47, 183, 183, 183, 76, 183, 76, 183,
                      183, 47, 183, 183, 76, 76, 76, 183,
                      183, 183, 47, 183, 76, 183, 76, 183,
                      47, 47, 183, 183, 183, 63, 183, 183, 
                      183, 183, 183, 183, 63, 183, 183, 183,
                      183, 183, 183, 183, 183, 183, 183, 183,
                      183, 183, 183, 183, 183, 183, 183, 183
                    ]
          },
          blocklyConfig: {
            toolboxCategories: [{
              name: "动作",
              blocks: [{
                type: "go"
              }, {
                type: "turn_left"
              }, {
                type: "turn_right"
              }]
            }, {
              name: "变量",
              blocks: [{
                  type: "variables_set",
                  values: {
                    VALUE: {
                      type: "math_number",
                      shadow: true,
                      fields: {
                        NUM: 0
                      }
                    }
                  }
                },
                {
                  type: "variables_get"
                }
              ]
            }, {
              name: "数学",
              blocks: [{
                type: "math_number"
              }, {
                type: "math_arithmetic",
                values: {
                  A: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 0
                    }
                  },
                  B: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 0
                    }
                  }
                }
              }, {
                type: "math_modulo",
                values: {
                  DIVIDEND: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 3
                    }
                  },
                  DIVISOR: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 2
                    }
                  }
                }
              }, {
                type: "math_single"
              }, {
                type: "math_trig"
              }, {
                type: "math_constant"
              }, {
                type: "math_random_int",
                values: {
                  FROM: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 0
                    }
                  },
                  TO: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 5
                    }
                  }
                }
              }]
            }, {
              name: "分支",
              blocks: [{
                type: "controls_if"
              }, {
                type: "logic_compare"
              }]
            }, {
              name: "循环",
              blocks: [{
                type: "controls_whileUntil"
              }, {
                type: "controls_for",
                values: {
                  FROM: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 0
                    }
                  },
                  TO: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 5
                    }
                  },
                  BY: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 1
                    }
                  }
                }
              }]
            }, {
              name: "文本",
              blocks: [{
                type: "text"
              }, {
                type: "text_print",
                values: {
                  TEXT: {
                    type: "text",
                    shadow: true,
                    fields: {
                      "TEXT": "abc"
                    }
                  }
                }
              }]
            }]
          }
        };

        const _data2 = {
          mapInitState: {
            board : {
              map : [[0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0]],
            },
            character : {
              pos : { x : 4, y : 4},
              dir : 2,
            },
          },
          mapResource: {
            "width": 8,
            "height": 8,
            "id": [ 
                    0, 1, 2, 3, 1, 2, 1, 4,
                    16, 5, 6, 10, 11, 12, 13, 20,
                    32, 21, 22, 26, 28, 156, 45, 36,
                    48, 49, 50, 26, 14, 15, 45, 52,
                    48, 51, 50, 26, 30, 31, 45, 52,
                    48, 49, 50, 58, 59, 59, 61, 52,
                    16, 50, 50, 50, 49, 50, 50, 52,
                    64, 65, 66, 67, 67, 65, 65, 68
                  ],
            "id_t": [
                      183, 183, 183, 183, 183, 77, 110, 79, 
                      183, 183, 183, 183, 183, 183, 183, 95, 
                      183, 183, 183, 183, 183, 183, 183, 95, 
                      183, 183, 34, 183, 183, 183, 183, 130, 
                      183, 55, 57, 183, 183, 183, 183, 183, 
                      183, 71, 73, 183, 183, 183, 183, 183, 
                      183, 183, 228, 183, 183, 183, 114, 183, 
                      183, 183, 183, 183, 183, 183, 183, 183
                    ]
          },
          blocklyConfig: {
            toolboxCategories: [{
              name: "动作",
              blocks: [{
                type: "go"
              }, {
                type: "turn_left"
              }, {
                type: "turn_right"
              }]
            }, {
              name: "数学",
              blocks: [{
                type: "math_number"
              }, {
                type: "math_arithmetic",
                values: {
                  A: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 0
                    }
                  },
                  B: {
                    type: "math_number",
                    shadow: true,
                    fields: {
                      NUM: 0
                    }
                  }
                }
              }]
            }, {
              name: "分支",
              blocks: [{
                type: "controls_if"
              }, {
                type: "logic_compare"
              }]
            }]
          }
        };

        const data1 = JSON.stringify(_data1);
        const data2 = JSON.stringify(_data2);
        const data3 = JSON.stringify(_data3);
        const data4 = JSON.stringify(_data4);
        //const data = querystring.stringify(body.data);
        const is_insert1 = await app.mysql.get('map', { id: 250 });
        const is_insert2 = await app.mysql.get('map', { id: 251 });
        const is_insert3 = await app.mysql.get('map', { id: 252 });
        const is_insert4 = await app.mysql.get('map', { id: 253 });
        if(is_insert1 === null)
          await app.mysql.insert('map', { id: 250, data: data1 });
        if(is_insert2 === null)
          await app.mysql.insert('map', { id: 251, data: data2 });
        if(is_insert3 === null)
          await app.mysql.insert('map', { id: 252, data: data3 });
        if(is_insert4 === null)
          await app.mysql.insert('map', { id: 253, data: data4 });
        //const insertSuccess = result.affectedRows === 1;
        //return insertSuccess;
        return data4;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return MapService;
};


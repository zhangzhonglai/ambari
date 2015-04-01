/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');

describe('App.TimeIntervalSpinnerView', function() {

  describe('#convertToWidgetUnits', function(){
    beforeEach(function() {
      this.view = App.TimeIntervalSpinnerView.create({
        initPopover: Em.K
      });
    });
    var tests = [
      {
        input: 60000,
        inputType: 'milliseconds',
        desiredUnits: "days,hours,minutes",
        e: [
          { label: 'Days', value: 0},
          { label: 'Hours', value: 0},
          { label: 'Minutes', value: 1}
        ]
      },
      {
        input: "2592000000",
        inputType: 'milliseconds',
        desiredUnits: "days,hours,minutes",
        e: [
          { label: 'Days', value: 30},
          { label: 'Hours', value: 0},
          { label: 'Minutes', value: 0}
        ]
      },
      {
        input: "604800000",
        inputType: 'milliseconds',
        desiredUnits: "days,hours,minutes",
        e: [
          { label: 'Days', value: 7},
          { label: 'Hours', value: 0},
          { label: 'Minutes', value: 0}
        ]
      },
      {
        input: "804820200",
        inputType: 'milliseconds',
        desiredUnits: "days,hours,minutes",
        e: [
          { label: 'Days', value: 9},
          { label: 'Hours', value: 7},
          { label: 'Minutes', value: 33}
        ]
      },
      {
        input: "70000",
        inputType: 'milliseconds',
        desiredUnits: "minutes",
        e: [
          { label: 'Minutes', value: 1}
        ]
      },
      {
        input: "140",
        inputType: 'minutes',
        desiredUnits: "hours,minutes",
        e: [
          { label: 'Hours', value: 2},
          { label: 'Minutes', value: 20}
        ]
      },
      {
        input: "2",
        inputType: 'hours',
        desiredUnits: "hours",
        e: [
          { label: 'Hours', value: 2}
        ]
      }
    ];

    tests.forEach(function(test) {
      it('should convert {0} {1} to {2}'.format(test.input, test.inputType, JSON.stringify(test.e)), function() {
        var result = this.view.convertToWidgetUnits(test.input, test.inputType, test.desiredUnits).map(function(item) {
          // remove unneccessary keys
          return App.permit(item, ['label', 'value']);
        });
        expect(result).to.eql(test.e);
      });
    });
  });

  describe('#convertToPropertyUnit', function(){
    beforeEach(function() {
      this.view = App.TimeIntervalSpinnerView.create({});
    });
    var tests = [
      {
        widgetUnits: [
          { unit: 'minutes', value: 10 },
          { unit: 'seconds', value: 2 }
        ],
        inputUnit: "seconds",
        e: 602
      },
      {
        widgetUnits: [
          { unit: 'minutes', value: 13 },
          { unit: 'seconds', value: 10 }
        ],
        inputUnit: "milliseconds",
        e: 790000
      },
      {
        widgetUnits: [
          { unit: 'days', value: 1 },
          { unit: 'hours', value: 2 }
        ],
        inputUnit: "milliseconds",
        e: 93600000
      }
    ];

    tests.forEach(function(test) {
      it('should convert {0} to {1} {2}'.format(JSON.stringify(test.widgetUnits), test.e, test.inputUnit), function() {
        expect(this.view.convertToPropertyUnit(test.widgetUnits, test.inputUnit)).to.equal(test.e);
      });
    });
  });

});

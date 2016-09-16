var device_base_src = "img/devices/";
var ship_src = "img/ships/";
var game_data = {

    ranks: [
        "Rookie",
        "Ensign",
        "Lieutenant Junior Grade",
        "Lieutenant",
        "Lieutenant Commander",
        "Commander",
        "Captain",
        "Rear Admiral",
        "Vice Admiral",
        "Admiral",
        "Fleet Admiral"
    ],
    default_names: [
        "Piloty McPilotface",
        "Unnamed Player",
        "AAA",
        "Playery McPlayerface",
        "Rookie Pilot",
        "Red Shirt",
        "Crashy McCrashface",
        "'Look at me! I r a pilot!'",
        "New Recruit",
        "'Enter your name here'"
    ],
    ships: [
        {
            name: "Falcon Elite Fighter", src: ship_src + "type-1-ship.png",
            thrust: 4,
            turning: 4,
            crew: 1,
            hull: 2,
            battery: 4,
            armor: 1,
            shields: 1
        },
        { name: "Banshee Multipurpose Fighter Bomber", src: ship_src +"type-2-ship.png",
            thrust: 3,
            turning: 3,
            crew: 1,
            hull: 2,
            battery: 3,
            armor: 1,
            shields: 1
        },
        { name: "Condor Gunship", src: ship_src +"type-3-ship.png",
            thrust: 3,
            turning: 2,
            crew: 2,
            hull: 2,
            battery: 6,
            armor: 3,
            shields: 1
        }
    ],
    primary_weapons: [
        { name: "Guns", src: device_base_src +"guns2a.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 2, rof: 5, vof: 2, damage: 1, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0},
        { name: "Spread Shot", src: device_base_src +"guns2.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 12, rof: 2, vof: 6, damage: 1, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0},
        { name: "Blasters", src: device_base_src +"lasers.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 5, rof: 4, vof: 2, damage: 2, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0},
    ],
    secondary_weapons: [
        { name: "Rocket Pods", src: device_base_src +"Missle.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 3, rof: 1, vof: 0, damage: 0, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0},
        { name: "Harpoon Missiles", src: device_base_src +"Missles2.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 2, rof: 1, vof: 0, damage: 0, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0},
        { name: "Homing Missile", src: device_base_src +"Missles3.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 2, rof: 1, vof: 0, damage: 0, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0},
        { name: "Torpedo", src: device_base_src +"Missles2.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 2, rof: 1, vof: 0, damage: 0, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0},
        { name: "Death Ray", src: device_base_src + "deathraymond.png",  description: "Lorem ipsum stuff and things",  shot_src: "", battery_use: 6, rof: 1, vof: 0, damage: 9, dot: 0, range: 0, tracking: 0, ap: 0, aoe: 0, shot_vel: 0}
    ],
    devices: [
        { name: "Battery Modulator", src: device_base_src +"device.png",  description: "Lorem ipsum stuff and things",  thrust: 0, turning: 2, crew: 0, hull: 0, battery: 2, armor: 0, shields: 1},
        { name: "Larger Engines", src: device_base_src +"engine.png",  description: "Lorem ipsum stuff and things",  thrust: 2, turning: 0, crew: 0, hull: 2, battery: 0, armor: 0, shields: 0},
        { name: "Support Thrusters", src: device_base_src +"device4.png",  description: "Lorem ipsum stuff and things",  thrust: 1, turning: 2, crew: 0, hull: 1, battery: 1, armor: 0, shields: 0},
        { name: "Shield Generator", src: device_base_src +"device5.png",  description: "Lorem ipsum stuff and things",  thrust: 0, turning: 0, crew: 0, hull: 1, battery: 1, armor: 0, shields: 2},
        { name: "Armor Plating", src: device_base_src +"device3.png",  description: "Lorem ipsum stuff and things",  thrust: 0, turning: 0, crew: 0, hull: 4, battery: 0, armor: 1, shields: 0},
        { name: "High Grade Engines", src: device_base_src +"engine2.png",  description: "Lorem ipsum stuff and things",  thrust: 1, turning: 2, crew: 0, hull: 2, battery: 0, armor: 0, shields: 0}
    ]

};


angular.module('shipViewerApp', []).controller('shipViewerController', function(){
    "use strict";
    var shipViewer = this;

    shipViewer.current_rank = 0;
    shipViewer.selected_ship_idx = 0;
    shipViewer.selected_color_val = 15;
    shipViewer.current_selections = {
        selected_primary_wep: 0,
        selected_secondary_wep: 0,
        selected_device1: 0,
        selected_device2: 0
    };
    shipViewer.deviceInspectionTarget = null;

    shipViewer.pilot_data = {
        name: "",
        rank: "",
        kills: 0,
        flight_time: 0,
        xp: 0
    };
    shipViewer.current_loadout = {
        main_weapon: "" ,
        secondary_weapon: "" ,
        device1: "",
        device2: ""
    };
    shipViewer.current_ship = {};
    shipViewer.current_specs = {};

    shipViewer.nextDevice = function(key){
        if(shipViewer.current_selections[key] < game_data.primary_weapons.length - 1){
            shipViewer.current_selections[key]++;
        }
        else{
            shipViewer.current_selections[key] = 0;
        }
        shipViewer.setLoadout();
        shipViewer.setShipSpecs();
    };

    shipViewer.prevDevice = function(key){
        if(shipViewer.current_selections[key] > 0){
            shipViewer.current_selections[key]--;
        }
        else{
            shipViewer.current_selections[key] = game_data.primary_weapons.length - 1;
        }
        shipViewer.setLoadout();
        shipViewer.setShipSpecs();
    };

    shipViewer.nextShip = function(){
        if(shipViewer.selected_ship_idx < game_data.ships.length - 1){
            shipViewer.selected_ship_idx++;
        }
        else{
            shipViewer.selected_ship_idx = 0;
        }
        shipViewer.setShip();
        shipViewer.setShipSpecs();

    };

    shipViewer.prevShip = function(){
        if(shipViewer.selected_ship_idx > 0){
            shipViewer.selected_ship_idx--;
        }
        else{
            shipViewer.selected_ship_idx = game_data.ships.length - 1;
        }
        shipViewer.setShip();
        shipViewer.setShipSpecs();
    };

    shipViewer.randomInt = function(min, max) {
        "use strict";
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    shipViewer.sumArgs = function(){
        var sum = 0;
        for (var i = 0, len = arguments.length; i < len; ++i) {
            sum += arguments[i];
        }
        return sum;
    };

    shipViewer.openMissionSelect = function(len){
        return new Array(len);
    };



    shipViewer.visualizeStat = function(len){
        return new Array(len);
    };

    shipViewer.componentToHex = function(color){
        var hex = color.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    shipViewer.nextShipColor = function(){
        if(shipViewer.selected_color_val > 0){
            shipViewer.selected_color_val -= 5;
        }
        else{
            shipViewer.selected_color_val = 100;
        }
        Caman("#sample-img", function () {
            this.hue(shipViewer.selected_color_val).render();
        });
        Caman("#ship-img", function () {
            this.hue(shipViewer.selected_color_val).render();
        });
    };

    shipViewer.prevShipColor = function(){
        if(shipViewer.selected_color_val < 100){
            shipViewer.selected_color_val += 5;
        }
        else{
            shipViewer.selected_color_val = 0;
        }
        Caman("#sample-img", function () {
            this.hue(shipViewer.selected_color_val).render();
        });
        Caman("#ship-img", function () {
            this.hue(shipViewer.selected_color_val).render();
        });
    };

    shipViewer.getStatColor = function(value){
        if(value > 5) {
            return '#3AFF0C';
        }
        if(value > 3) {
            return '#D9FF0B';
        }
        if(value > 1) {
            return '#FFBF00';
        }
        else {
            return '#FF3C08';
        }
    };

    shipViewer.setLoadout = function(){
        shipViewer.current_loadout = {
            main_weapon: game_data.primary_weapons[shipViewer.current_selections.selected_primary_wep],
            secondary_weapon: game_data.secondary_weapons[shipViewer.current_selections.selected_secondary_wep],
            device1: game_data.devices[shipViewer.current_selections.selected_device1],
            device2: game_data.devices[shipViewer.current_selections.selected_device2]
        };
    };

    shipViewer.setShip = function(){
        shipViewer.current_ship = game_data.ships[shipViewer.selected_ship_idx];
    };

    shipViewer.renamePilot = function(name){
        shipViewer.pilot_data.name = name;
    };

    shipViewer.promotePilot = function(){
        shipViewer.current_rank++;
        shipViewer.pilot_data.rank = game_data.ranks[shipViewer.current_rank];
    };

    shipViewer.setShipSpecs = function(){
        var specs = {
            thrust: 0,
            turning: 0,
            crew: 0,
            hull: 0,
            battery: 0,
            armor: 0,
            shields: 0
        };

        for(var key in specs){
            specs[key] = shipViewer.current_ship[key];
            specs[key] += shipViewer.current_loadout.device1[key];
            specs[key] += shipViewer.current_loadout.device2[key];
        }
        shipViewer.current_specs = specs;
    };

    shipViewer.setShipData = function(){
        shipViewer.setShip();
        shipViewer.setLoadout();
        shipViewer.pilot_data = {
            name: game_data.default_names[shipViewer.randomInt(1, game_data.default_names.length)],
            rank: game_data.ranks[shipViewer.current_rank]
        };

        shipViewer.setShipSpecs();
    }();

    shipViewer.confirmShipConfig = function(){
        return 0;
    };
});
var compose = function(targetObj) {
    var err = 'Error: all arguments passed in to compose must be objects';

    if (typeof targetObj !== 'object') {
        throw err;
    } else {
        for (var i = 0; i < arguments.length; i += 1) {
            var arg = arguments[i];

            if (typeof arg === 'object') {
                for (var key in arg) {
                    targetObj[key] = arg[key];
                }
            } else {
                throw err;
            }
        }

        return targetObj;
    }
};

var refueler = function(state) {
    return {
        refuel: function() {
            state.gas++;
        }
    }
};
var flyer = function(state) {
    return {
        fly: function() {
            if (state.gas > 0) {
                state.position += 10;
                state.gas -= 1;
            }
        }
    }
};

var shooter = function() {
    return {
        shoot: function(flyer) {
            flyer.dead = true;
        }
    }
};

var saver = function() {
    return {
        save: function(flyer) {
            flyer.dead = false;
        }
    }
};

var driver = function(state) {
    return {
        drive: function() {
            if (state.gas > 0) {
                state.position += 5;
                state.gas -= 1;
            }
        }
    }
};

var plane = function(name) {
    var state = {
        name: name,
        position: 0,
        gas: 1
    }
    return compose(
        state,
        refueler(state),
        flyer(state),
        shooter()
    )
}
var plane1 = plane();


var medicJeep = function(name) {
    var state = {
        name: name,
        position: 0,
        gas: 1
    }
    return compose(
        state,
        refueler(state),
        flyer(state),
        saver()
    )
}
var medicJeep1 = medicJeep();

var attackJeep = function(name) {
    var state = {
        name: name,
        position: 0,
        gas: 1
    }
    return compose(
        state,
        refueler(state),
        flyer(state),
        shooter()
    )
}
var attackJeep1 = attackJeep();

var turret = function(name) {
    var state = {
        name: name
    }
    return compose(
        state,
        shooter()
    )
}
var turret1 = turret();

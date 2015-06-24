$(function()
{
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext('2d');

    var numCreature = 5;
    var numGoals = 50;
    var fps = 30;
    var moveGoals = window.location.hash == '#move';
    var world = {
        creatures: [],
        goals: [],
        width: canvas.width,
        height: canvas.height,
        context: ctx
    };
    var iteration = 0;

    var i, x, y;

    //популяция особей
    for (i = 0; i < numCreature; i++)
    {
        x = Math.random() * world.width;
        y = Math.random() * world.height;

        world.creatures[i] = new Creature(world, x, y);
        world.creatures[i].velocity.random();
    }

    //популяция целей
    for (i = 0; i < numGoals; i++)
    {

        world.goals[i] = new Goal(world);
        if (moveGoals)
            world.goals[i].velocity.random();
    }

    var findNearly = function(creature, mass, callback){

        //Перебор по всем целям, расчет вхождения
        var i, distance, angle, goalAngle, inSector, inDistance;
        var mindist = 9999, mingoal;
        for (i in mass)
        {

            //Расстояние к цели
            distance = creature.location.dist(mass[i].location);

            if(distance < mass[i].length){
                callback(mass[i]);
                continue;
            }

            var goalAngle = getAngleBeetweenGoalAndAgent(mass[i], creature);


            //Цель в обл. видимости?
            inSector = goalAngle < creature.lookRange;

            //Цель рядом?
            inDistance = distance < creature.lookDistance;

            if (distance < mindist && inSector && inDistance || distance < creature.length*5){
                mindist = distance;
                mingoal = mass[i];

            }
        }

    };

    var endMatch = function(bestCreature){

        world.creatures.forEach(function(creature)
        {
            creature.counter = 0;

            if (creature == bestCreature)
                return;

            creature.network = bestCreature.network.clone();
        });
    };

    $(window).on('hashchange', function() {

        if (window.location.hash == '#move'){
            //движение целей
            for (i = 0; i < numGoals; i++)
            {
                world.goals[i].velocity.random();
            }
        }
        if (window.location.hash == '#default'){
            //движение целей
            for (i = 0; i < numGoals; i++)
            {
                world.goals[i].velocity.set(0,0);
            }
        }
    });
    var loop = function()
    {
        // fade effect

        ctx.fillStyle="#ffffff";
        ctx.fillRect(0,0,world.width, world.height);

        world.goals.forEach(function(goal)
        {
            goal.draw();
        });
        var goal, rival, neighbor, input, output, target;

        world.creatures.forEach(function(creature)
        {
            var limit = iteration+1;
            if (limit < 5){
                limit = 5;
            }
            if(creature.counter >= limit){
                endMatch(calcEffect(world.creatures));
                iteration++;
            }

            //Определим цели в зоне видимости
            goal = findNearly(creature, world.goals, function(found){

                creature.counter ++;
                //Поймали жертву
                found.setRandomLocation(world.width,world.height);
            });

            //Определим соперников в зоне видимости
            rival = findNearly(creature, world.creatures);

            if (goal && rival)
            {
                // move
                input = [
                    goal.location.dist,
                    goal.location.angle,
                    rival.location.dist,
                    rival.location.angle
                ];

                output = creature.network.activate(input);
                creature.moveTo(output);

                // learn
                creature.network.geneticConversion(target);
            }

            // draw
            creature.draw();
        });

        setTimeout(loop, 1000/fps);
    };

    // blastoff
    loop();

});



$(function()
{
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext('2d');

    var numCreature = 10;
    var numGoals = 80;
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

    var targetX = function(cohesion){
        return (cohesion.location.x + Math.random() * (10-iteration) ) / world.width;
    };

    var targetY = function(cohesion){
        return (cohesion.location.y  + Math.random() * (10-iteration) ) / world.height;
    };
    var targetAngle = function(creature, goal){

        return Math.atan2(
            goal.location.x - creature.location.x,
            goal.location.y - creature.location.y
        );
    };

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



            if (iteration > 3){
                goalAngle = true;
            } else {
                goalAngle = getAngleBeetweenGoalAndAgent(mass[i], creature);
            }

            //Цель в обл. видимости?
            inSector = goalAngle < creature.lookRange;

            //Цель рядом?
            inDistance = distance < creature.lookDistance;

            if (distance < mindist && inSector && inDistance || distance < creature.length*5){
                mindist = distance;
                mingoal = mass[i];

            }
        }
        if(mingoal){
            creature.cohesion = mingoal;
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
        var goal, neighbor, input, output, target;
        var learningRate = iteration*0.05+0.02;
        if (learningRate > 0.4){
            learningRate = 0.4;
        }
        world.creatures.forEach(function(creature)
        {
            var limit = iteration+1;
            if (limit < 5){
                limit = 5;
            }
            if(creature.counter > limit){
                endMatch(creature);
                if (iteration <= 10)
                    iteration++;
            }
            //Определим цели в зоне видимости
            findNearly(creature, world.goals, function(found_goal){
                world.creatures.forEach(function(creature_find)
                {
                   if (found_goal == creature_find.cohesion){
                       creature_find.cohesion = null;
                   }
                });
                creature.counter ++;
                //Поймали жертву
                found_goal.setRandomLocation(world.width,world.height);
            });

            goal = creature.cohesion;
            if (goal)
            {
                // move
                input = [
                    goal.location.x + Math.random() * (10-iteration),
                    goal.location.y + Math.random() * (10-iteration)
                ];

                output = creature.network.activate(input);
                creature.moveTo(output);

                // learn
                target = [
                    targetX(goal),
                    targetY(goal),
                    targetAngle(creature,goal)];
                creature.network.propagate(learningRate, target);
            }

            // draw
            creature.draw();
        });

        setTimeout(loop, 1000/fps);
    };

    // blastoff
    loop();

});



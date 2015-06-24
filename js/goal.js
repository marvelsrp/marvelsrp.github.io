function Goal(world)
{
   // this.network = new synaptic.Architect.Perceptron(2, 8, 3);
    this.world = world;
    this.mass = 1;
    this.maxspeed = 0.5;
    this.maxforce = .2;

    this.length = this.mass * 10;
    this.location = new Vector( Math.random() * this.world.width*0.9 + 15, Math.random() * this.world.height*0.9 + 15);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.color = "#FF0000";
    this.bgcolor = "#F08080";
}

Goal.prototype = {

    moveTo: function(networkOutput){
        var force = new Vector(0,0);

        var target = new Vector(networkOutput[0] * this.world.width, networkOutput[1] * this.world.height);
        var angle = (networkOutput[2] * Math.PI * 2) - Math.PI;

        var separation = this.separate(this.world.goals);
        var alignment = this.align(this.world.goals).setAngle(angle);
        var cohesion = this.seek(target);

        force.add(separation);
        force.add(alignment);
        force.add(cohesion);

        this.applyForce(force);
    },
    setRandomLocation: function(){
        this.location.x = Math.random() * this.world.width*0.9 + 15;
        this.location.y = Math.random() * this.world.height*0.9 + 15;
    },
    draw: function()
    {
        this.update();

        var context = this.world.context;


        var angle = this.velocity.angle();

        context.lineWidth = 3;
        context.fillStyle = this.bgcolor;
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.location.x, this.location.y, this.length, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
    },

    update: function()
    {
        this.boundaries();
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
      //  if(this.velocity.mag() < 1.5)
       //     this.velocity.setMag(1.5);
        this.location.add(this.velocity);
        this.acceleration.mul(0);
    },

    applyForce: function(force)
    {
        this.acceleration.add(force);
    },

    boundaries: function()
    {
        if (this.location.x < 15)
            this.applyForce(new Vector(this.maxforce * 2, 0));

        if (this.location.x > this.world.width - 15)
            this.applyForce(new Vector(-this.maxforce * 2, 0));

        if (this.location.y < 15)
            this.applyForce(new Vector(0, this.maxforce * 2));

        if (this.location.y > this.world.height - 15)
            this.applyForce(new Vector(0, -this.maxforce * 2));

    },

    seek: function(target)
    {
        var seek = target.copy().sub(this.location);
        seek.normalize();
        seek.mul(this.maxspeed);
        seek.sub(this.velocity).limit(0.3);

        return seek;
    },

    separate: function(neighbors)
    {
        var sum = new Vector(0,0);
        var count = 1;

        for (var i in neighbors)
        {
            if (neighbors[i] != this)
            {
                var d = this.location.dist(neighbors[i].location);
                if (d < 24 && d > 0)
                {
                    var diff = this.location.copy().sub(neighbors[i].location);
                    diff.normalize();
                    diff.div(d);
                    sum.add(diff);
                    count++;
                }
            }
        }
        if (!count)
            return sum;

        sum.div(count);
        sum.normalize();
        sum.mul(this.maxspeed);
        sum.sub(this.velocity);
        sum.limit(this.maxforce);

        return sum.mul(2);
    },

    align: function(neighbors)
    {
        var sum = new Vector(0,0);
        var count = 0;
        for (var i in neighbors)
        {
            if (neighbors[i] != this)// && !neighbors[i].special)
            {
                sum.add(neighbors[i].velocity);
                count++;
            }
        }
        sum.div(count);
        sum.normalize();
        sum.mul(this.maxspeed);

        sum.sub(this.velocity).limit(this.maxspeed);

        return sum.limit(.1);
    },

    cohesion: function(neighbors)
    {
        var sum = new Vector(0,0);
        var count = 0;
        for (var i in neighbors)
        {
            if (neighbors[i] != this)// && !neighbors[i].special)
            {
                sum.add(neighbors[i].location);
                count++;
            }
        }
        sum.div(count);

        return sum;
    }
};
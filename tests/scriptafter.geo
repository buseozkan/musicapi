SetFactory("OpenCASCADE");

Geometry.AutoCoherence=0;

Cylinder(1) = {0, 0, 1,
 0, 0, 0.2,
 1, 2*Pi}; 

Field[1] = MathEval;
Field[1].F = "1";
Field[2] = Restrict;
Field[2].SurfacesList = {1};
Field[2].VolumesList = {1};
Background Field = 1;


Mesh 3;

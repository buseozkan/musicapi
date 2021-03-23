// Gmsh project created on Sun Mar 14 13:34:06 2021
SetFactory("OpenCASCADE");

Geometry.AutoCoherence=0;

Cylinder(1) = {0, 0, 1,
 0, 0, 0.2,
 1, 2*Pi};

Field[1] = MathEval;
//+
Field[1].F = "5";
//+
Field[2] = Restrict;
//+
Field[2].SurfacesList = {1};
Background Field = 1;


Mesh 3;
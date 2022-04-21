nnx = [.5 -.5 -.5 .5 .5 -.5 -.5 .5 0 0 0 0];
nny = [.5 .5 -.5 -.5 0 0 0 0 .5 -.5 -.5 .5];
nnz = [0 0 0 0 .5 .5 -.5 -.5 .5 .5 -.5 -.5];

% {111} plane
% [xsurf,ysurf] = meshgrid([-1:1],[-1:1]);
% zsurf = -xsurf-ysurf;

% {200} plane
% [ysurf,zsurf] = meshgrid([-1:1],[-1:1]);
% xsurf = zeros(3);

% {220} plane
[ysurf,zsurf] = meshgrid([-1:1],[-1:1]);
xsurf = -ysurf;

hold on
scatter3(0,0,0)
scatter3(nnx,nny,nnz)
surf(xsurf,ysurf,zsurf)
load instronData.mat
load qualData.mat

v = @(arr) table2array(arr);
r = raw_brass;
s = 'Brass';
cutoff = 261;
f = "b";

% v stands for value. The table(rows,vars) syntax returns a table, and v
% just takes its value
% r is for raw data
% s is for sample name
% cutoff is set by the user, based on where they want the stress-strain
% plot to cut off. Values are included.
% Al 1hr   45
% Al 4hr   106
% Brass    261
% Copper   360
% f is used for creating format strings

stress = (r.LoadkN*1E3) ./ (v(qualData('pre-gthick',s))*v(qualData('pre-gwidth',s))*1E-6);
strain = r.Extensionmm ./ v(qualData('pre-plen','Al_1hr'));
%sampleData = table(stress,strain);

% curveAx = axes();
hold on
grid on
%plot(strain(1:cutoff),stress(1:cutoff),f+"-")
plot3(strain(1:cutoff),stress(1:cutoff),r.DataPoint(1:cutoff),f+"-")
xlabel('Strain')
ylabel('Stress (Pascals)')
% legend(curveAx,s,'Location','southeast')

rsq = 1;
inc = 2;
while rsq >=0.99
    %disp(inc)
    [elastic,fitInfo] = fit(strain(1:inc),stress(1:inc),'poly1');
    rsq = fitInfo.rsquare;
    inc = inc + 1;
end
% annotAx = axes();
% hold on
% xlim(annotAx,curveAx.XLim)
% ylim(annotAx,curveAx.YLim)
plot(strain(1:inc),elastic(strain(1:inc)),f+":")
scatter(strain(inc-1),stress(inc-1),100,f+"o")
scatter(strain(find(stress == max(stress))),max(stress),100,f+"*")
% annotAx.Visible = 'off';

fprintf('Youngs Modulus: %.2E kPa \n',elastic.p1)
fprintf('Yield Strength: %.2E kPa \n',stress(inc-1))
fprintf('Ultimate Tensile Strength: %.2E kPa \n',max(stress))
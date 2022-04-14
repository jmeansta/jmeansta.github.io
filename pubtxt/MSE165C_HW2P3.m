chiB = @(chiA) 1-chiA;
omega = 7500;
R = 8.314;
deltaGOfMixing = @(chiA,chiB,T) omega.*chiA.*chiB + T.*R.*(chiA.*log(chiA) + chiB.*log(chiB));
chiA_vector = [0:0.01:1];

deltaGOfMixing_200 = deltaGOfMixing(chiA_vector,chiB(chiA_vector),200);
deltaGOfMixing_293 = deltaGOfMixing(chiA_vector,chiB(chiA_vector),293);
deltaGOfMixing_325 = deltaGOfMixing(chiA_vector,chiB(chiA_vector),325);

hold on
plot(chiA_vector,deltaGOfMixing_200,chiA_vector,deltaGOfMixing_293,chiA_vector,deltaGOfMixing_325)
plot(chiA_vector,zeros(1,101))
legend("T = 200 K","T = 293 K","T = 325 K","ΔG of mixing = 0")
xlabel("mol fraction of A")
ylabel("ΔG of mixing")
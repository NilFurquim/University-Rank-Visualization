import csv

#0-WorldRank
#1-UniversityName
#2-Country
#3-TeachingRating
#4-InterOutlookRating
#5-ResearchRating
#6-CitationsRating
#7-IndustryIncomeRating
#8-TotalScore
#9-NumStudents
#10-StudentToStaffRatio
#11-PerInterStudents
#12-PerFemaleStudents

def interpolate(intera, interb):
    intera -= 200.0;
    interb -= 200.0;
    return 48.8*(1 - ((intera+interb)/2.0)/600.0);

#Conversion from position to totalScore (just for reference)
posToScore = {
         "201-250":interpolate(201,250),
         "251-300":interpolate(251,300),
         "301-350":interpolate(301,350),
         "351-400":interpolate(351,400),
         "401-500":interpolate(401,500),
         "501-600":interpolate(501,600),
         "601-800":interpolate(601,800)
         }

with open('TimesWorldUniversityRankings2016.csv', 'rb') as rawFile, open('preprocessed.csv','w') as preprocessedFile:
    reader = csv.reader(rawFile, delimiter=',')
    writer = csv.writer(preprocessedFile,delimiter=",");

    numStudentsMax = 0;
    for i, row in enumerate(reader):
        if(i == 0):
            writer.writerow(row);
            continue;

        validRow = True

        #Overwriting TotalScore
        if(row[0] in posToScore.keys()):
            row[8] = posToScore[row[0]];


        for value in row:
            if(value in ("", "-", " ")):
                validRow = False
                break;

        if(validRow):
            if(numStudentsMax < float(row[9])):
                numStudentsMax = row[9];
            writer.writerow(row);
    print ("Max of NumStudents:", numStudentsMax);

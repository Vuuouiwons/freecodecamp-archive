def add_time(start, duration, dayOfWeek=None):
    time, meridiem = start.split(' ') 
    meridiem = 1 if meridiem == "PM" else 0 # [[h:m], (am=0|pm=1)]
    SH, SM = [int(i) for i in time.split(":")]
    SH = SH + 12 if meridiem else SH
    DH, DM = [int(i) for i in duration.split(":")] # [hour, minutes]
    ans = None
  
    dayDict = { "Monday" : 1, "Tuesday" : 2, "Wednesday" : 3, "Thursday" : 4, "Friday" : 5, "Saturday" : 6, "Sunday" : 7, 1 : "Monday", 2 : "Tuesday", 3 : "Wednesday", 4 : "Thursday", 5 : "Friday", 6 : "Saturday", 7 : "Sunday", "":""}
    meridiemDict = { 0 : "AM", 1 : "PM"}
  
    if type(dayOfWeek) == type(''):
        dayOfWeek = dayOfWeek.lower()
        t = dayOfWeek[0].upper()
        dayOfWeek = t + dayOfWeek[1:]
        dayStart = dayDict[dayOfWeek]
        
    def timeFormat(list):
        ans = []
        for i in list:
            i = "0" + str(i) if i <= 9 else str(i)
            ans.append(i)
        if ans[0] == 0:
            ans = 12
        return ":".join(ans)
      
    sumMin = SM + DM
    
    if sumMin > 59:
        DH += 1
        DM = 0
        FM = sumMin - 59
    else:
        FM = sumMin
    # hour
    FH = SH + DH
    dayCounter = FH // 24
    FH %= 24
    if type(dayOfWeek) == type(''):
        weekDay = 0 if dayCounter == 0 else dayCounter - 1
        dayKey = dayStart + (weekDay % 7)
        
    else: 
        dayKey = ""

    if dayOfWeek == None:
        day = ""
    else:
        if dayCounter == 1:
            day = "(next day)"
        else:
            if dayCounter == 0:
                day = ""
            else:
                day = f"({dayCounter} days later)"
    
    comma = "" if dayDict[dayKey] == "" else f", {dayDict[dayKey]}"

    print(f"{timeFormat([FH-12, FM])} {meridiemDict[meridiem]}{comma} {day}".strip())
    return f"{timeFormat([FH-12, FM])} {meridiemDict[meridiem]}{comma} {day}".strip()




#add_time("3:00 PM", "3:10")
# Returns: 6:10 PM

#add_time("11:30 AM", "2:32", "Monday")
# Returns: 2:02 PM, Monday

#add_time("11:43 AM", "00:20")
# Returns: 12:03 PM

#add_time("10:10 PM", "3:30")
# Returns: 1:40 AM (next day)

#add_time("11:43 PM", "24:20", "tueSday")
# Returns: 12:03 AM, Thursday (2 days later)

#add_time("6:30 PM", "205:12")
# Returns: 7:42 AM (9 days later)
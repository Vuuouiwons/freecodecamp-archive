def add_time(start, duration, dayOfWeek=None):
    def timeFormat(time):
        time = "0" + str(time) if time <= 9 else str(time)
        return time

    def normalizeDayOfWeek(raw):
        if type(raw) == type(''):
            lower = raw.lower()
            t = lower[0].upper()
            ans = t + lower[1:]
            return ans

    sh, sm = start.split(' ')[0].split(':')
    dh, dm = duration.split(':')
    sh, sm, dh, dm = [int(sh), int(sm), int(dh), int(dm)]
    meridium = start.split(' ')[1]
    day_passed = 0
    dayDict = {"Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 0, 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 0: "Sunday", "": ""}
    dayOfWeek = normalizeDayOfWeek(dayOfWeek)

    """meridium check"""
    if meridium == "PM":
        if sh == 12:
            sh += 11
        elif sh < 12:
            sh += 12

    '''sum start and duration'''
    fh = sh + dh
    fm = sm + dm

    """final time check"""
    if fm > 59:
        fh += 1
        fm -= 60

    """day passed"""
    if fh > 23:
        day_passed = fh // 24
        fh -= 24 * day_passed

    """24h to 12h format"""
    if fh == 0:
        meridium = 'AM'
        fh += 12
    elif fh > 0 and fh < 12:
        meridium = 'AM'
    elif fh == 12:
        meridium = 'PM'
    elif fh > 12 and fh < 24:
        meridium = 'PM'
        fh -= 12

    '''formatting'''
    if dayOfWeek == None:
        if day_passed == 0:
            return f"{fh}:{timeFormat(fm)} {meridium}"
        elif day_passed == 1:
            return f"{fh}:{timeFormat(fm)} {meridium} (next day)"
        elif day_passed > 1:
            return f"{fh}:{timeFormat(fm)} {meridium} ({day_passed} days later)"
    elif type(dayOfWeek) == type(''):
        day = dayDict[dayOfWeek] + day_passed
        day %= 7
        if day_passed == 0:
            return f"{fh}:{timeFormat(fm)} {meridium}, {dayOfWeek}"
        elif day_passed == 1:
            return f"{fh}:{timeFormat(fm)} {meridium}, {dayDict[day]} (next day)"
        elif day_passed > 1:
            return f"{fh}:{timeFormat(fm)} {meridium}, {dayDict[day]} ({day_passed} days later)"
    return [fh, fm, day_passed]
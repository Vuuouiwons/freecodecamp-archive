def arithmetic_arranger(inputLists, flag=False):
    from re import search

    splitEquation = []
    # max character of each number in equation + 2
    maxLength = 6

    if len(inputLists) > 5:
        '''
        error case #1 more than 5 problems
        '''
        return "Error: Too many problems."

    for i in inputLists:
        splitEquation.append(i.split(" "))

    for i in splitEquation:
        '''
        error case #2 operator is not + or -
        '''
        if i[1] != "+":
            if i[1] != "-":
                return "Error: Operator must be '+' or '-'."

    for i in splitEquation:
        '''
        error case #3 number is not a number
        '''
        r = "\D"
        if search(r, i[0]) or search(r, i[2]):
            return "Error: Numbers must only contain digits."
            

    for i in splitEquation:
        '''
        error case #4 the length of number is more than 4 digits
        '''
        rightShift = 2
        lengthNum1 = len(i[0]) + rightShift
        lengthNum2 = len(i[2]) + rightShift
        i.append(lengthNum2) if lengthNum1 < lengthNum2 else i.append(lengthNum1)
        if lengthNum1 > maxLength or lengthNum2 > maxLength:
            return "Error: Numbers cannot be more than four digits."
            
    ansList = []
    SPACING = "    "
    temp = []
    for i in splitEquation:
        NUM_SPACING = i[-1]
        s = "{:>%d}" % (NUM_SPACING)
        temp.append(s.format(i[0]))
    ansList.append(SPACING.join(temp))
    temp = []

    for i in splitEquation:
        NUM_SPACING = i[-1]
        s = "%s {:>%d}" % (i[1], NUM_SPACING - 2)
        temp.append(s.format(i[2]))
    ansList.append(SPACING.join(temp))
    temp = []

    for i in splitEquation:
        temp.append(i[-1]*"-")
    ansList.append(SPACING.join(temp))
    temp = []
  
    if flag:
        """
        check flag values for revealing answers
        """
        for i in splitEquation:
            NUM_SPACING = i[-1]
            ans = 0
            if i[1] == "+":
                ans = int(i[0]) + int(i[2])
            else:
                ans = int(i[0]) - int(i[2])
            s = "{:>%d}" % (NUM_SPACING)
            temp.append(s.format(ans))
        ansList.append(SPACING.join(temp))
        
    return '\n'.join(ansList)
import math

class Category:
  def __init__(self, _name):
    self.name = _name
    self.ledger = []

  def __str__(self):
    start = self.name.center(30, "*")
    start += '\n'
    
    mutation = ''
    for i in self.ledger:
      desc = i["description"]
      amount = i["amount"]
      mutation += desc[:23].ljust(23) + " " + "{:.2f}".format(amount) + "\n"
    
    total = "Total: " + str(self.get_balance())
    
    return start + mutation + total

  def check_funds(self, amount) -> bool:
    total = 0.0
    
    for i in self.ledger: total += i["amount"]
      
    if amount > total : return False
    return True
    
  def deposit(self, amount, desc="") -> None:
    
    self.ledger.append({"amount" : amount,
                        "description" : desc})

  def withdraw(self, amount, desc="") -> bool:
    
    if self.check_funds(amount):
      self.ledger.append({"amount" : -1 * amount,
                          "description" : desc})
      return True
    return False

  def get_balance(self) -> float:
    total = 0.0
    
    for i in self.ledger:
      total += i["amount"]
    
    return total

  def transfer(self, amount, category) -> bool:
    
    if self.check_funds(amount):
      withdraw_desc = f"Transfer to {category.name}"
      deposit_desc = f"Transfer from {self.name}"
      
      self.withdraw(amount, withdraw_desc)
      category.deposit(amount, deposit_desc)
      
      return True
      
    return False

def create_spend_chart(category):
  
  def round_to_nearest_ten(num, base=10) -> int:
    return base * math.floor(num/base)
  
  ans = "Percentage spent by category\n"
  spent_category = []
  percent_spent = []
  total_spent = 0

  """total spent for all category and total spent every category"""
  for i in category:
    mutation = i.ledger
    sum = 0
    category_name = []
    for i in category:
      category_name.append(i.name)
    
    for i in mutation:
      if i["amount"] < 0:
        sum += float(i["amount"])
    spent_category.append(sum)
    total_spent += sum
  
  """percent spent"""
  for i in spent_category:
    spent = float(i/total_spent)
    spent_percentage = spent * 100
    percent_spent.append(round_to_nearest_ten(spent_percentage))

  """bar chart"""
  for i in range(100, -10, -10):
    ans += f"{str(i).rjust(3)}| "
    for j in percent_spent:
      if i <= j:
        ans += "o  "
      else:
        ans += "   "
    ans += "\n"
    
  """line from bar graph"""
  line = "    -"
  for i in range(len(category)):
    line += "---"
  ans += line + "\n"

  """category naming"""
  max_category_name = len(max(category_name, key=len))
  
  for i in range(1, max_category_name+1):
    ans += "     "
    for j in category_name:
      if i <= len(j):
        ans += f"{j[i-1]}  "
      else:
        ans += "   "
    ans += "\n"
    
  return ans[:-1]
  
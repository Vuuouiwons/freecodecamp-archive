import copy
import random 
# Consider using the modules imported above.

class Hat:
  def __init__(self, **kwargs):
    self.__ball_dict = kwargs
    self.__ball_dict_keys = list(kwargs.keys())
    self.contents = []
    for i in self.__ball_dict_keys:
      for _ in range(self.__ball_dict[i]):
        self.contents.append(i)
    
  def __str__(self):
    return str(self.contents)

  def draw(self, num_draw) -> list:
    if num_draw >= len(self.contents):
      _contents = copy.deepcopy(self.contents)
      self.contents = []
      return _contents
    else:
      ans = []
      for _ in range(num_draw):
        r = random.randint(0, len(self.contents) - 1)
        val = self.contents.pop(r)
        ans.append(val)
        '''
        r = random.randint(0, len(self.contents) - 1)
        _contents = copy.copy(self.contents)
        val = _contents.pop(r)
        ans.append(val)
        '''
      return ans
      
def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  if num_balls_drawn >= len(hat.contents):
    return 1.0
    
  bad = 0
  dict_keys = expected_balls.keys()
  
  for _ in range(0, num_experiments - 1):
    _hat = copy.deepcopy(hat)
    val = _hat.draw(num_balls_drawn)
    
    for i in dict_keys:
      print(val.count(i), expected_balls[i], i, num_experiments-bad, _)
      if val.count(i) < expected_balls[i]:
        bad += 1
        break
        
  good = num_experiments-bad
  return good/num_experiments
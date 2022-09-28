import re

class Rectangle:
  def __init__(self, width, height):
    self.__width = width
    self.__height = height

  def __str__(self):
    return f"Rectangle(width={self.__width}, height={self.__height})"
  
  def set_width(self, width):
    self.__width = width

  def set_height(self, height):
    self.__height = height
  
  def get_area(self) -> int:
    return self.__width * self.__height
  
  def get_perimeter(self) -> int:
    return self.__width * 2 + self.__height * 2
    
  def get_diagonal(self) -> int:
    return (self.__width ** 2 + self.__height ** 2) ** .5
    
  def get_picture(self) -> str:
    ans = ''
    if self.__height > 50 or self.__width > 50:
      return "Too big for picture."
    for i in range(self.__height):
      for i in range(self.__width):
        ans += '*'
      ans += '\n'
    return ans
  
  def get_amount_inside(self, rect) -> int:
    '''
    grab side or width and height of the class
    '''
    list = re.findall("\d+", str(rect))
    _row_square, _width, _height, _side = 0, 0, 0, 0
    
    if len(list) == 1:
      _side = int(list[0])
      '''how many rect in row'''
      _row_rect = self.__width // _side
      '''how many rect in row'''
      _col_rect = self.__height // _side
      
      return _row_rect * _col_rect
      
    else:
      _width = int(list[0])
      _height = int(list[1])
      '''how many rect in row'''
      _row_rect = self.__width // _width
      '''how many rect in col'''
      _col_rect = self.__height // _height
      
      return _row_rect * _col_rect # rectangle
     
class Square(Rectangle):
  def __init__(self, side):
    self.__side = side
    super().__init__(side, side)

  def __str__(self):
    return f"Square(side={self.__side})"
  
  def set_side(self, side):
    self.__side = side
    self.__width = side
    self.__height = side
    
  def set_width(self, side):
    self.__side = side
    self.__width = side
    self.__height = side

  def set_height(self, side):
    self.__side = side
    self.__width = side
    self.__height = side

  def get_picture(self) -> str:
    ans = ''
    if self.__side > 50:
      return "Too big for picture."
    for i in range(self.__side):
      for i in range(self.__side):
        ans += '*'
      ans += '\n'
    return ans

rect = Rectangle(10, 5)
print(rect.get_area())
rect.set_height(3)
print(rect.get_perimeter())
print(rect)
print(rect.get_picture())

sq = Square(9)
print(sq.get_area())
sq.set_side(4)
print(sq.get_diagonal())
print(sq)
print(sq.get_picture())

rect.set_height(8)
rect.set_width(16)
print(rect.get_amount_inside(sq))
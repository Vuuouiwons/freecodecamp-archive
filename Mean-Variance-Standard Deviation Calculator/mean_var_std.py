import numpy as np


def calculate(input_list):
    # check input
    if len(input_list) != 9:
        raise ValueError("List must contain nine numbers.")

    np_list = np.array(input_list)
    list_33 = np_list.reshape(3, 3)

    calculations: dict[str, list[list]] = dict()
    # autopep8: off
    calculations["mean"] = [list(np.mean(list_33, axis=0)), list(np.mean(list_33, axis=1)), np.mean(list_33)]
    calculations["variance"] = [list(np.var(list_33, axis=0)), list(np.var(list_33, axis=1)), np.var(list_33)]
    calculations["standard deviation"] = [list(np.std(list_33, axis=0)), list(np.std(list_33, axis=1)), np.std(list_33)]
    calculations["max"] = [list(np.max(list_33, axis=0)), list(np.max(list_33, axis=1)), np.max(list_33)]
    calculations["min"] = [list(np.min(list_33, axis=0)), list(np.min(list_33, axis=1)), np.min(list_33)]
    calculations["sum"] = [list(np.sum(list_33, axis=0)), list(np.sum(list_33, axis=1)), np.sum(list_33)]
    # autopep8: on
    
    # print(calculations)

    return calculations

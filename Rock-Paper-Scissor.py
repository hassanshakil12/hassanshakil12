import random
# r > s ==> s > p ==> p > r
def play():
    user = input("Rock[R], Paper[P] and Scissor[S]: ")
    pc = random.choice(["r", "p", "s"])
    
    if user == pc:
        print(user + " and " + pc + " - Game Tie!")
    
    elif win(user, pc):
        print(user + " and " + pc + " - You Win!")

    else:
        print(user + " and " + pc + " - You lose!")

def win(player, opp):
    if(player == "r" and opp == "s")or(player == "s" and opp == "p")or(player == "p" and opp == "r"):
        return True

play()
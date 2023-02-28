import cv2
import mediapipe as mp
import numpy as np

cap = cv2.VideoCapture(0)

drawing = mp.solutions.drawing_utils
hands = mp.solutions.hands
hand_obj = hands.Hands(max_num_hands = 1)

i = 0

while True:
    i=i+1
    _, frm = cap.read()
    
    h, w, c = frm.shape

    frm = cv2.flip(frm,1)
    
    res = hand_obj.process(cv2.cvtColor(frm, cv2.COLOR_BGR2RGB))
    foi = frm
    dim = frm.shape
    # Draw the hand landmarks on the image
    if res.multi_hand_landmarks:
        for hand_landmarks in res.multi_hand_landmarks:

            # Draw a rectangle around the hand
            x_max = y_max = 0
            x_min = dim[1]
            y_min= dim[0]
            for landmark in hand_landmarks.landmark:
                x, y = int(landmark.x * frm.shape[1]), int(landmark.y * frm.shape[0])
                
                if x < x_min:
                    x_min = x
                if x > x_max:
                    x_max = x
                if y < y_min:
                    y_min = y
                if y > y_max:
                    y_max = y
            wid = x_max-x_min
            if wid<200:
                wid_d = (200 - wid)//2
                
            ht = y_max-y_min
            if ht<250:
                ht_d = (250 - ht)//2
            cv2.rectangle(frm, (x_min-wid_d, y_min-ht_d), (x_max+wid_d, y_max+ht_d), (0, 255, 0), 2)
            
            foi = frm[y_min-ht_d+2:y_max+ht_d-2, x_min-wid_d+2:x_max+wid_d-2]
            #foi = frm[y_min:y_max, x_min:x_max]
            #drawing.draw_landmarks(frm,res.multi_hand_landmarks[0],hands.HAND_CONNECTIONS) 


    cv2.imshow("Video", foi)
    
    if cv2.waitKey(1) == ord('s'):
                cv2.imwrite(f'E:\My Doucuments\Machine Learning\Gesture Identification\palm\palm{i}.jpg', foi)
   
    if cv2.waitKey(1) == ord('q'):
        cv2.destroyAllWindows()
        cap.release()
        break

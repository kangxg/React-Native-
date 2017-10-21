//
//  CalendarManager.m
//  RNTransplant
//
//  Created by kangxg on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTLog.h>
@implementation CalendarManager
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEventOne:(NSString *)name){
  NSLog(@"接收传过来的NSString+NSString: %@", name);
}
 // 接收传过来的 NSString + NSDictionary
RCT_EXPORT_METHOD(addEventTwo:(NSString *)name details:(NSDictionary *)details)
{
    RCTLogInfo(@"接收传过来的NSString+NSDictionary: %@ %@", name, details);
}
// 接收传过来的 NSString + date日期
RCT_EXPORT_METHOD(addEventThree:(NSString *)name date:(NSDate *)date)
{
  NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
  [formatter setDateFormat:@"yyyy-MM-dd"];
  RCTLogInfo(@"接收传过来的NSString+NSDictionary: %@ %@", name, [formatter stringFromDate:date]);
}


@end

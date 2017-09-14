import { Component } from '@angular/core';

export interface IResults{
    result: IResult;
    errors: any;
    isSuccess:boolean;
}

export interface IResult{
    boundedContext: string;
    aggregateId: string;
    commits: ICommits[];
    
}

export interface ICommits{
    aggregateRootRevision: number;
    events: Array<any>;
}




import { Component } from '@angular/core';

export interface IResults{
    result: any;
    errors?: any;
    isSuccess:boolean;
}

export interface IResult<T> {
    result: T;
    errors?: string[];
    isSuccess: boolean;
}

export interface IAggregate{
    boundedContext: string;
    aggregateId: string;
    commits: ICommits[];
    
}

export interface ICommits{
    aggregateRootRevision: number;
    events: Array<any>;
}

export interface IProjections {
    projections: IProjection[];
}

export interface IProjection {
    projectionContractId: string;
    projectionName: string;
    versions: IProjectionVersion[];
}

export interface IProjectionVersion {
    hash: string;
    revision: number;
    status: string;
}

export interface IProjectionDetail {
    name: string;
    state: any;
}

export interface Post {
    id: number;
    userId: string;
    body: string;
    title: string;
}




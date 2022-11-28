
import * as Services from './../utils/mongo_dao';
import { Types } from 'mongoose'
export class BaseEntity {
    public ObjectId = Types.ObjectId
    public DAOManager = new Services.mongoDAOManager();
    protected modelName: ModelNames | any;
    constructor(modelName?) {
        this.modelName = modelName
    }

    async createOneEntity(saveData: Object) {
        try {
            let data = await this.DAOManager.saveData(this.modelName, saveData)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async createMulti(saveData: any) {
        try {
            let data = await this.DAOManager.insertMany(this.modelName, saveData, {})
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async getOneEntity(criteria: Object, projection: Object) {
        // try {

        try {
            let data = await this.DAOManager.findOne(this.modelName, criteria, projection, { lean: true })
            return data
        } catch (error) {

            return Promise.reject(error)
        }

        // let data = await model.findOne({
        //     where : criteria
        // })
        // return data
        // } catch (error) {

        //     return Promise.reject(error)
        // }

    }
    async updateOneEntity(criteria: Object, dataToUpdate: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, lean: true }
            let data = await this.DAOManager.findAndUpdate(this.modelName, criteria, dataToUpdate, option)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async replaceOneEntity(criteria: Object, replacement: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, upsert: true }
            let data = await this.DAOManager.findAndReplaceOne(this.modelName, criteria, replacement, option)
            return data
        } catch (error) {

            return Promise.reject(error)
        }

    }

    async getById(_id: string, projection: Object) {
        try {
            let data = await this.DAOManager.findOne(this.modelName, { _id: _id }, projection, { lean: true })
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async getMultiple(criteria: Object, projection: Object) {
        try {
            let data = await this.DAOManager.getData(this.modelName, criteria, projection, { lean: true })
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async getDistinct(key: string, criteria: Object) {
        try {
            let data = await this.DAOManager.distinct(this.modelName, key, criteria)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async updateMultiple(criteria: Object, projection: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, multi: true }
            let data = await this.DAOManager.updateMany(this.modelName, criteria, projection, option)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async aggregate(pipeline, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.aggregateData(this.modelName, pipeline, option)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async removeEntity(criteria: Object) {
        try {
            let data = await this.DAOManager.remove(this.modelName, criteria)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async findAndRemove(criteria: Object) {
        try {
            let data = await this.DAOManager.findAndRemove(this.modelName, criteria, {});
            return data;
        } catch (error) {

            return Promise.reject(error)
        }
    };

    async count(criteria: Object) {
        try {
            let data = await this.DAOManager.count(this.modelName, criteria)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async getMultiplePaginate(criteria: Object, projection: Object, option) {
        try {
            let data = await this.DAOManager.getDataPagination(this.modelName, criteria, projection, option)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }

    async updateEntity(criteria: Object, dataToUpdate: Object, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.updateOrUpsert(this.modelName, criteria, dataToUpdate, option)
            return data
        } catch (error) {

            return Promise.reject(error)
        }
    }
}

export const BaseEn = new BaseEntity();

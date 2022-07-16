'use strict'

class modelInterface {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async readOne(id) {
    try {
      let oneRecord = await this.model.findOne({where: { id }});
      return oneRecord;
    } catch(err){
      console.error(err);
      return err;
    }

  }

  async readAll() {
    try {
      let allRecords = await this.model.findAll();
      return allRecords;
    } catch(err){
      console.error(err);
      return err;
    }
  }

  async update(data, id) {
    try {
      await this.model.update(data, {where: { id }});
      let updateRecord = await this.model.findOne( {where: { id }});
      return updateRecord;
    } catch(err) {
      console.error(err);
      return err;
    }
  }

  async delete(id) {
    try {
      let deleteRecord = await this.model.findOne({where: { id }});
      await this.model.destroy({where: { id }});
      return deleteRecord;
    } catch(err){
      console.error(err);
      return err;
    }
  }
}

module.exports = modelInterface;
